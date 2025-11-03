import './GerenciarUsuarios.css';
import { useEffect, useState } from 'react';
import { api } from '../../provider/apiInstance';
import { ENDPOINTS } from '../../routers/endpoints';
import { formatarCPF, formatarCNPJ } from '../../utils/formatacoes';
import { Link, useNavigate } from 'react-router-dom';
import { bloquearAcessoGerencia } from "../../utils/token";
import { exibirAvisoAcessoNegado } from "../../utils/exibirModalAviso";
import lapisEditor from "../../assets/iconeLapisBranco.png";
import { ROUTERS } from '../../routers/routers';
import { definirCargo } from '../../utils/usuario';

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
  const [paginaAtual, setPaginaAtual] = useState(1);
  const usuariosPorPagina = 8; // quantidade de usuários por página

  const navegar = useNavigate();

  useEffect(() => {
    carregarUsuarios();
  }, []);

  useEffect(() => {
    if (bloquearAcessoGerencia(false)) {
      exibirAvisoAcessoNegado(navegar);
    }
  }, []);

  const carregarUsuarios = () => {
    api.get(ENDPOINTS.USUARIOS, {
      headers: {
        Authorization: `Bearer ${sessionStorage.TOKEN}`
      }
    })
      .then((res) => {
        const origem = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.content)
            ? res.data.content
            : Array.isArray(res.data?.data)
              ? res.data.data
              : [];

        const lista = origem.map(u => {
          let documento = '';
          if (u.cpf) {
            documento = formatarCPF(u.cpf);
          } else if (u.cnpj) {
            documento = formatarCNPJ(u.cnpj);
          }
          return {
            tipo: definirCargo(u.tipo),
            id: u.id,
            nome: u.nome,
            email: u.email,
            telefone_celular: u.telefone_celular,
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
    setPaginaAtual(1); // volta pra primeira página ao filtrar
  };

  // Paginação
  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);
  const inicio = (paginaAtual - 1) * usuariosPorPagina;
  const fim = inicio + usuariosPorPagina;
  const usuariosPaginados = usuariosFiltrados.slice(inicio, fim);

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
              <th>Tipo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usuariosPaginados.length > 0 ? (
              usuariosPaginados.map((u) => (
                <tr key={u.id}>
                  <td>{u.nome}</td>
                  <td>{u.email}</td>
                  <td>{u.documento}</td>
                  <td>{u.tipo}</td>
                  <td>
                    <Link
                      className="btn-editar"
                      to={`${ROUTERS.ALTERARCARGO.replace(":id", u.id)}`}
                      title="Editar usuário"
                      state={{ u }}
                    >
                      <img src={lapisEditor} alt="Editar" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
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
