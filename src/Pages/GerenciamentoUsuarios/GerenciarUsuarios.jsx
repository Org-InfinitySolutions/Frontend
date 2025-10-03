import './GerenciarUsuarios.css';
import { useEffect, useState } from 'react';
import { api } from '../../provider/apiInstance';
import { ENDPOINTS } from '../../routers/endpoints';
import { formatarCPF, formatarCNPJ } from '../../utils/formatacoes';
import { useNavigate } from 'react-router-dom';
import { bloquearAcessoGerencia } from "../../utils/token";
import { exibirAvisoAcessoNegado } from "../../utils/exibirModalAviso";
import lapisEditor from "../../assets/iconeLapisBranco.png";

const normalizarTexto = (texto) => {
  return texto
    ? texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    : "";
};

function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroDocumento, setFiltroDocumento] = useState("");
  const navegar = useNavigate();

  useEffect(() => {
    carregarUsuarios();
  }, []);

    const [desabilitar, setDesabilitar] = useState(false);
    useEffect(() => {
        if(bloquearAcessoGerencia()){
            exibirAvisoAcessoNegado();
        }
    }, []);

  const carregarUsuarios = () => {
    api.get(ENDPOINTS.USUARIOS, {
      headers: {
        Authorization: `Bearer ${sessionStorage.TOKEN}`
      }
    })
      .then((res) => {
        const lista = res.data.map(u => {
          var documento = '';
          if (u.cpf) {
            documento = formatarCPF(u.cpf);
          } else if (u.cnpj) {
            documento = formatarCNPJ(u.cnpj);
          }
          return {
            id: u.id,
            nome: u.nome,
            email: u.email,
            documento
          };
        });
        setUsuarios(lista);
        setUsuariosFiltrados(lista);
      })
      .catch((err) => {
        console.error("Erro ao carregar usuários", err);
      });
  };

  const aplicarFiltros = (e) => {
    e.preventDefault();
    const lista = usuarios.filter(u => {
      const nomeOk = normalizarTexto(u.nome).includes(normalizarTexto(filtroNome));
      const emailOk = normalizarTexto(u.email).includes(normalizarTexto(filtroEmail));
      const docOk = normalizarTexto(u.documento).includes(normalizarTexto(filtroDocumento));
      return nomeOk && emailOk && docOk;
    });
    setUsuariosFiltrados(lista);
  };

  return (
    <section className='usuarios'>
      <h3 className='titulo'>Usuários</h3>

      <form className='pesquisas' onSubmit={aplicarFiltros}>
        <div className="campo">
          <h3>Nome</h3>
          <input
            type="text"
            placeholder='Ex: João Souza Santos'
            value={filtroNome}
            onChange={(e) => setFiltroNome(e.target.value)}
          />
        </div>
        <div className="campo">
          <h3>E-mail</h3>
          <input
            type="text"
            placeholder='Ex: joao.souza@email.com'
            value={filtroEmail}
            onChange={(e) => setFiltroEmail(e.target.value)}
          />
        </div>
        <div className="campo">
          <h3>CPF/CNPJ</h3>
          <input
            type="number"
            placeholder='Ex: 123.456.789-91'
            value={filtroDocumento}
            onChange={(e) => setFiltroDocumento(e.target.value)}
          />
        </div>
        <div className="campo botao">
          <button type="submit">Buscar</button>
        </div>
      </form>

      <section className='lista-usuarios'>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>CPF/CNPJ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((u) => (
                <tr key={u.id}>
                  <td>{u.nome}</td>
                  <td>{u.email}</td>
                  <td>{u.documento}</td>
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => navegar(`/usuarios/editar/${u.id}`)}
                      title="Editar usuário"
                    >
                      <img src={lapisEditor} alt="Editar" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  Nenhum usuário encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </section>
  );
}

export { GerenciarUsuarios };
