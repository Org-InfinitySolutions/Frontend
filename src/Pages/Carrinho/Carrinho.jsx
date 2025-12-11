import { useNavigate } from 'react-router-dom'
import { Navegabilidade } from '../../components/Navegabilidade/Navegabilidade';
import { CardProdutoCarrinho } from '../../components/CardProdutoCarrinho/CardProdutoCarrinho';
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import './Carrinho.css'
import { ROUTERS } from '../../routers/routers';

function Carrinho() {

    const navigate = useNavigate();
    const [carrinho, setCarrinho] = useState(() => {
        // Garantindo que o CARRINHO exista antes de tentar parsear
        const storedCarrinho = sessionStorage.getItem('CARRINHO');
        if (storedCarrinho) {
            try {
                // Se o JSON.parse falhar, retorna array vazio
                return JSON.parse(storedCarrinho).produtos || []; 
            } catch (e) {
                console.error("Erro ao parsear CARRINHO do sessionStorage", e);
                return [];
            }
        }
        return [];
    });
    


    const atualizarQuantidade = (produtoId, novaQuantidade) => {
        const novoCarrinho = [...carrinho];
        const index = novoCarrinho.findIndex(x => x.produtoId == produtoId);
        if (index >= 0) {
            novoCarrinho[index].quantidade = Number(novaQuantidade) || 1;
            atualizarCarrinho(novoCarrinho);
        } else {
            console.error(`Produto com ID ${produtoId} não encontrado no carrinho.`);
        }
    }

    const incrementarQuantidade = (produtoId) => {
        const novoCarrinho = [...carrinho];
        const index = novoCarrinho.findIndex(x => x.produtoId == produtoId);
        if (index >= 0) {
            if(novoCarrinho[index].quantidade < 999) {
                novoCarrinho[index].quantidade += 1;
            }
            atualizarCarrinho(novoCarrinho);
        } else {
            console.error(`Produto com ID ${produtoId} não encontrado no carrinho.`);
        }
    }

    const decrementarQuantidade = (produtoId) => {
        const novoCarrinho = [...carrinho];
        const index = novoCarrinho.findIndex(x => x.produtoId == produtoId);
        if (index >= 0) {
            if(novoCarrinho[index].quantidade > 1){
                novoCarrinho[index].quantidade -= 1;
            }
            atualizarCarrinho(novoCarrinho);
        } else {
            console.error(`Produto com ID ${produtoId} não encontrado no carrinho.`);
        }
    }

    const removerProduto = (produtoId) => {
        const novoCarrinho = [...carrinho];

        const index = novoCarrinho.findIndex(x => x.produtoId == produtoId);

        if (index >= 0) {
            novoCarrinho.splice(index, 1);
            atualizarCarrinho(novoCarrinho);
        } else {
            console.error(`Produto com ID ${produtoId} não encontrado no carrinho.`);
        }
    }

    const atualizarCarrinho = (novoCarrinho) => {
        setCarrinho(novoCarrinho);
        const json = JSON.parse(sessionStorage.CARRINHO || '{}'); 
        json.produtos = novoCarrinho;
        sessionStorage.CARRINHO = JSON.stringify(json);
    }

    const totalItens = carrinho.reduce((total, item) => total + (item.quantidade || 0), 0);

    return (
        <div className="carrinho">
            <div className="carrinho-header">
                <h1>Itens Solicitados</h1> 
            </div>
            {carrinho.length === 0 ? (
                <div className='carrinho-vazio'>
                    <div className='carrinho-vazio-icon'>
                        <FaShoppingCart />
                    </div>
                    <h2>Sua lista de solicitação está vazia</h2> 
                    <p>Você ainda não tem produtos adicionados para orçamento.</p> 
                    <p>Explore nossa seleção de equipamentos e encontre o que você precisa!</p>
                    <button className="btn-explorar-produtos" onClick={() => navigate(ROUTERS.EQUIPAMENTOS)}>
                        Explorar Equipamentos
                    </button>
                </div>
            ) : (
                <>
                    <div className="carrinho-conteudo">
                        <section className="container-equipamentos">
                            {carrinho.map((item, i) => (
                                <CardProdutoCarrinho
                                    id={item.produtoId}
                                    key={`${i}_${item.produtoId}`}
                                    nome={item.nome}
                                    imagem={item.imagem}
                                    quantidade={item.quantidade}
                                    apenasLeitura={false}
                                    atualizarQuantidade={atualizarQuantidade}
                                    removerProduto={() => removerProduto(item.produtoId)}
                                    incrementarQuantidade={() => incrementarQuantidade(item.produtoId)}
                                    decrementarQuantidade={() => decrementarQuantidade(item.produtoId)}
                                />
                            ))}
                        </section>

                       
                        <section className="resumo-pedido">
                            <h2>Resumo da Solicitação</h2>
                            <div className="resumo-item total">
                                <span>Quantidade total de itens:</span>
                                <strong>{totalItens}</strong>
                            </div>
                            
                            
                            <p className="nota-orcamento">
                                Nota: Os valores de locação não são exibidos nesta etapa. O preço final será enviado por e-mail após a análise da sua solicitação de orçamento.
                            </p>
                            
                            <button 
                                className="btn-finalizar-pedido" 
                                onClick={() => navigate(ROUTERS.CARRINHOENDERECO)}
                            >
                                Avançar para Orçamento
                            </button>
                        </section>
                      

                    </div>
                        <Navegabilidade linkVoltar={ROUTERS.EQUIPAMENTOS} funcaoAvancar={null} textoAvancar={null}/>
                </>
            )}
        </div>
    )
}

export { Carrinho }