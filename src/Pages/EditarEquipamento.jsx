import './EditarEquipamento.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { tokenExpirou } from '../Utils/token';
import { api } from '../provider/apiInstance';
import { campoVazio } from '../Utils/validarCampos';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { exibirAviso, exibirAvisoTimer, exibirAvisoTokenExpirado } from '../Utils/exibirModalAviso'
import LoadingBar from 'react-top-loading-bar';

export function EditarEquipamento() {

  const { id } = useParams();
  const navegar = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [barraCarregamento, setBarraCarregamento] = useState(0);

  const [quantidade, setQuantidade] = useState(1);
  const [modelo, setModelo] = useState('');
  const [marca, setMarca] = useState('');
  const [descricao, setDescricao] = useState('');
  const [linkFabricante, setLinkFabricante] = useState('');
  const [categoriaEquipamento, setCategoriaEquipamento] = useState('');
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [ativo, setAtivo] = useState('');

  // métodos callback
  useEffect(() => {
    if(tokenExpirou()){
      exibirAvisoTokenExpirado(navegar);
    }
  
    buscarDadosEquipamento();
    listarCategorias();
  }, []);

  useEffect(() => {
    if(quantidade <= 0){
      setQuantidade(1)
    }
  }, [quantidade])

  const [exibirPreview, setExibirPreview] = useState(false);
  useEffect(() => {
    if(imagem){
      setPreview(URL.createObjectURL(imagem));
      setExibirPreview(true);
    } else {
      setPreview(URL.revokeObjectURL(imagem));
      setExibirPreview(false);
    }
  }, [imagem]);

  const [desativarBotao, setDesativarBotao] = useState(true);
  useEffect(() => {
    if(campoVazio(modelo) || campoVazio(marca) || campoVazio(descricao) || campoVazio(linkFabricante) || categoriaEquipamento == '' || (!imagem && !exibirPreview) ){
      setDesativarBotao(true);
    } else {
      setDesativarBotao(false);
    }
  }, [linkFabricante, modelo, marca, imagem, categoriaEquipamento, descricao]);

  // métodos
  const salvarEquipamento = () => {

    if(tokenExpirou()){
      exibirAvisoTokenExpirado(navegar);
    } else {
      setBarraCarregamento(10);
      const req = {
        modelo,
        marca,
        descricao,
        url_fabricante: linkFabricante,
        qtd_estoque: quantidade,
        categoria_id: categoriaEquipamento,
        is_ativo: !ativo
      }

      setBarraCarregamento(30);
      setTimeout(() => {
        setBarraCarregamento(70);
        api.put(`/produtos/${id}`, req, {
          headers: {
            Authorization: `Bearer ${sessionStorage.TOKEN}`
          }
        }).then(async (res) => {

          if(imagem){
            await salvarImagem();
          }
          setBarraCarregamento(100);
          exibirAviso('Operação realizada com sucesso!', 'success');
        }).catch((err) => {
          setBarraCarregamento(100);
          const erro = err.response.data;

          if(erro.validationErrors !== null){
            exibirAviso(erro.validationErrors[0].message, 'error');
          } if(err.status == 404){
            exibirAviso(erro.error, 'error');
          } 
          else {
            exibirAviso(erro.message, 'error');
          }
        })
      }, 1000)
    }
  }

  const salvarImagem = () => {

    const formImagem = new FormData();
    formImagem.append('imagem', imagem);

    api.put(`/produtos/${id}/imagem`, formImagem, {
      headers: {
        Authorization: `Bearer ${sessionStorage.TOKEN}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      return;
    }).catch((err) => {
      const caixote = err.response.data;
      if(err.status == 404){
        exibirAviso(caixote.error, 'error');
      } else if(err.status == 400){
        exibirAviso('Não foi possivel atualizar a foto do produto', 'error');
      }
    })
  }

  const buscarDadosEquipamento = () => {

    api.get(`/produtos/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.TOKEN}`
      }
    }).then((res) => {
      const caixote = res.data;

      setAtivo(!caixote.is_ativo);
      setMarca(caixote.marca);
      setModelo(caixote.modelo);
      setQuantidade(caixote.qtd_estoque);
      setLinkFabricante(caixote.url_fabricante);
      setDescricao(caixote.descricao);
      setCategoriaEquipamento(caixote.categoria.id);

      if(caixote.imagem.length > 0){
        setExibirPreview(true);
        setPreview(caixote.imagem[0]);
      }
    }).catch((err) => {
      if(err.status == 404){
        exibirAvisoTimer(err.response.data.error, 'error');
        setTimeout(() => { navegar('/equipamentos') }, 3300);
      }
    })
  }

  const validarForm = () => {
    if(campoVazio(modelo) || campoVazio(marca) || campoVazio(descricao) || campoVazio(linkFabricante)){
      exibirAviso('Preencher todos os campos obrigatórios', 'error');
    } else if(quantidade <= 0){
      exibirAviso('O campo quantidade é inválido', 'error');
    } else if(categoriaEquipamento == '#'){
      exibirAviso('É obrigatório informar uma categoria', 'error');
    } else if(!imagem && !exibirPreview){
      exibirAviso('É obrigatório informar uma foto para o produto', 'error');
    } else{
      salvarEquipamento();
    }
  }

  const listarCategorias = () => {

    api.get('/categorias', {
      headers: {
        Authorization: `Bearer ${sessionStorage.TOKEN}`
      }
    }).then((res) => {
      const caixote = res.data;
      setCategorias(caixote);
      setCategoriaEquipamento(caixote[0].id);
    }).catch((err) => {
      console.log(err.data.message);
    })
  }

  const aumentarQuantidade = (e) => {
    e.preventDefault();
    if(quantidade < 999){
      setQuantidade(Number(quantidade) + 1);
    }
  }

  const diminuirQuantidade = (e) => {
    e.preventDefault();
    if(quantidade > 1){
      setQuantidade(quantidade - 1);
    }
  }

  return (
    <div className="container-equipamento">
      <LoadingBar
          progress={barraCarregamento}
          height={3}
          color="#f11946"
      />
      <h2>Editar Equipamento</h2>

      <form className="formulario-equipamento">
        <div className="linha-principal">
          <label className="upload-foto" htmlFor='inp_foto'>
            {exibirPreview ? (
              <img src={preview} alt="imagem do produto"/>
            ) : (
              <span>* SUBIR FOTO</span>
            )}
          </label>
          <input type="file" id='inp_foto' className='subir-foto' accept='.png, .jpeg, .jpg' onChange={(e) => { setImagem(e.target.files[0])}}/>
          <div className="coluna-inputs">
            <label>* Nome Equipamento</label>
            <input type="text" placeholder="Nome do equipamento" value={modelo} onChange={(e) => { setModelo(e.target.value)}}/>

            <label>* Nome Fabricante</label>
            <input type="text" placeholder="Nome do fabricante" value={marca} onChange={(e) => { setMarca(e.target.value)}}/>

            <div className='box-informacoes-gerenciais'>
              <div className='box-definir-quantidade'>
                <label>Quantidade no Estoque</label>
                <div className="estoque-contador">
                  <button onClick={diminuirQuantidade}><FaMinus /></button>
                  <input type="text" maxLength="3" value={quantidade} onChange={(e) => { setQuantidade(Number(e.target.value) || 1)}}/>
                  <button onClick={aumentarQuantidade}><FaPlus /></button>
                </div>
              </div>
              <div className='box-definir-categoria'>
                <label>Categoria</label>
                <select name="slc_categoria" id="slc_categoria" value={categoriaEquipamento} onChange=
                {(e) => { setCategoriaEquipamento(e.target.value)}}>
                  {categorias.map((item, i) => (
                    <option key={i} value={item.id}>{item.nome}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="descricao-section">
          <label>* Descrição do Equipamento</label>
          <textarea placeholder="Descrição..." value={descricao} onChange={(e) => {setDescricao(e.target.value)}}/>
        </div>

        <div className="url-section">
          <label>* Link do Fabricante</label>
          <input type="url" placeholder="URL..." value={linkFabricante} onChange={(e) => { setLinkFabricante(e.target.value)}}/>
        </div>

        <div className="situacao-section">
          <label htmlFor='situacao-registro'>Situação registro</label>
          <input type="checkbox" id='situacao-registro' checked={ativo} onChange={(e) => {setAtivo(e.target.checked)}}/>
          <span>inativo</span>
        </div>

        <p className="info-obrigatorio">* Preenchimento Obrigatório</p>
      </form>

      <div className="botao-container">
        <button className="botao-cancelar-edicao" onClick={() => {navegar(`/equipamentos`)}}>Cancelar</button>
        <button type="button" className="botao-editar" onClick={validarForm} disabled={desativarBotao}>SALVAR</button>
      </div>
    </div>
  );
}
