
/* EM BREVE SERÁ EXCLUIDO ESSE ARQUIVO */

import './AdicionarEquipamento.css';
import LoadingBar from 'react-top-loading-bar';
import { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { tokenExpirou } from '../../utils/token'
import { exibirAvisoTokenExpirado, exibirAviso } from '../../utils/exibirModalAviso'
import { useNavigate } from 'react-router-dom';
import { campoVazio } from '../../utils/validarCampos'
import { api } from '../../provider/apiInstance';
import { ROUTERS } from '../../routers/routers';
import { ENDPOINTS } from '../../routers/endpoints';

export function AdicionarEquipamento() {

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

  // métodos callback
  useEffect(() => {
    if(tokenExpirou()){
      exibirAvisoTokenExpirado(navegar);
    }
  
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
    }
  }, [imagem]);

  const [desativarBotao, setDesativarBotao] = useState(true);
  useEffect(() => {
    if(campoVazio(modelo) || campoVazio(marca) || campoVazio(descricao) || campoVazio(linkFabricante) || categoriaEquipamento == '' || !imagem){
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
        categoria_id: categoriaEquipamento
      }

      setBarraCarregamento(30);
      const formData = new FormData();
      formData.append('produto', new Blob([JSON.stringify(req)], { type: 'application/json' }));
      formData.append('imagem', imagem);

      setTimeout(() => {
        setBarraCarregamento(70);
        api.post(ENDPOINTS.PRODUTOS, formData, {
          headers: {
            Authorization: `Bearer ${sessionStorage.TOKEN}`,
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          setBarraCarregamento(100);
          exibirAviso('Operação realizada com sucesso!', 'success');
          limparCampos();
        }).catch((err) => {
          const erro = err.response.data;
          if(erro.validationErrors.length > 0){
            exibirAviso(erro.validationErrors[0].message, 'error');
          } else {
            exibirAviso(erro.message, 'error');
          }
        })
      }, 1000)
    }
  }

  const validarForm = () => {
    if(campoVazio(modelo) || campoVazio(marca) || campoVazio(descricao) || campoVazio(linkFabricante)){
      exibirAviso('Preencher todos os campos obrigatórios', 'error');
    } else if(quantidade <= 0){
      exibirAviso('O campo quantidade é inválido', 'error');
    } else if(categoriaEquipamento == '#'){
      exibirAviso('É obrigatório informar uma categoria', 'error');
    } else if(!imagem){
      exibirAviso('É obrigatório informar uma foto para o produto', 'error');
    } else{
      salvarEquipamento();
    }
  }

  const listarCategorias = () => {

    api.get(ENDPOINTS.CATEGORIAS)
    .then((res) => {
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

  const limparCampos = () => {
    setQuantidade(1);
    setModelo('');
    setMarca('');
    setDescricao('');
    setLinkFabricante('');
    setPreview(null);
    setExibirPreview(false);
    setImagem('')
    setCategoriaEquipamento(categorias[0].id)
  }

  return (
    <div className="container-equipamento">
      <LoadingBar
          progress={barraCarregamento}
          height={3}
          color="#f11946"
      />
      <h2>Adicionar Equipamento</h2>

      <form className="formulario-equipamento">
        <div className="linha-principal">
          <label className="upload-foto" htmlFor='inp_foto'>
            {exibirPreview ? (
              <img src={preview} alt="imagem do produto" height={'100%'} width={'100%'}/>
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
                <select name="slc_categoria" id="slc_categoria" value={categoriaEquipamento} onChange={(e) => { setCategoriaEquipamento(e.target.value)}}>
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
          <textarea placeholder="Descrição..." value={descricao} onChange={(e) => { setDescricao(e.target.value)}}/>
        </div>

        <div className="url-section">
          <label>* Link do Fabricante</label>
          <input type="url" placeholder="URL..." value={linkFabricante} onChange={(e) => { setLinkFabricante(e.target.value)}}/>
        </div>

        <p className="info-obrigatorio">* Preenchimento Obrigatório</p>
      </form>

      <div className="botao-container">
        <button type="button" className="botao-adicionar" onClick={() => { navegar(`${ROUTERS.EQUIPAMENTOS}`)}}>CANCELAR</button>
        <button type="button" className="botao-adicionar" onClick={validarForm} disabled={desativarBotao}>ADICIONAR</button>
      </div>
    </div>
  );
}
