import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Produto.css';
import IconeNotebook from '../../assets/notebook.png';
import IconeCarrinho from '../../assets/iconeCarrinho.png';
import { api } from '../../provider/apiInstance';
import { ToastContainer, toast } from 'react-toastify';
import { FaCartShopping } from 'react-icons/fa6';
import { ROUTERS } from '../../routers/routers';
import { ENDPOINTS } from '../../routers/endpoints';

const Produto = () => {
  const { id } = useParams();
  const navegar = useNavigate();
  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setCarregando(true);
    api.get(ENDPOINTS.PRODUTOID.replace(':id', id))
      .then(res => {
        const data = res.data;
        setProduto({
          ...data,
          nome: data.modelo,
          imagem: Array.isArray(data.imagem) && data.imagem.length > 0 && data.imagem[0] ? data.imagem[0] : IconeNotebook,
        });
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  }, [id]);

  const adicionarAoCarrinho = (produto) => {
    const carrinhoAtual = JSON.parse(sessionStorage.getItem('CARRINHO')) || { produtos: [] };
    const index = carrinhoAtual.produtos.findIndex(item => item.produtoId === produto.id);
    if (index !== -1) {
      carrinhoAtual.produtos[index].quantidade += 1;
    } else {
      carrinhoAtual.produtos.push({
        produtoId: produto.id,
        quantidade: 1,
        imagem: produto.imagem,
        nome: produto.nome
      });
    }
    sessionStorage.setItem('CARRINHO', JSON.stringify(carrinhoAtual));
    toast(<> <FaCartShopping /> &nbsp; Produto adicionado no carrinho! </>);
  };

  const adicionarCarrinho = () => {
    if (produto) {
      adicionarAoCarrinho(produto);
    }
  };

  if (carregando) {
    return <div className="pagina-detalhes"><p>Carregando...</p></div>;
  }

  if (!produto) {
    return <div className="pagina-detalhes"><p>Produto não encontrado.</p></div>;
  }

  return (
    <div className="pagina-detalhes">
      <ToastContainer />
      <header className="topo-produto">
        <button className="botao-adicionar-carrinho" onClick={adicionarCarrinho}>ADICIONAR AO CARRINHO</button>
        <div className="icone-carrinho">
          <a href={ROUTERS.CARRINHO}>
            <img src={IconeCarrinho} alt="Carrinho de compras" />
          </a>
        </div>
      </header>

      <main className="conteudo-detalhes">
        <div className="info-principal">
          <img className="imagem-produto" src={produto.imagem} alt={produto.nome} />

          <div className="info-textual">
            <h2>{produto.nome}</h2>
            <h4>{produto.categoria?.nome || 'Sem categoria'}</h4>
          </div>
        </div>

        <section className="descricao">
          <h3>DESCRIÇÃO</h3>
          <p>{produto.descricao || 'Sem descrição disponível.'}</p>
        </section>
        
        <p className="info-fabricante">
          Para mais informações do equipamento. Consulte o {produto.url_fabricante ? (
            <a href={produto.url_fabricante} target="_blank" rel="noreferrer">fabricante</a>
          ) : (
            'fabricante'
          )}.
        </p>
      </main>
    </div>
  );
};

export { Produto };
