import './AdicionarEquipamento.css';
import { Input } from '../components/Input'

export function AdicionarEquipamento() {
  return (
    <div className="container-equipamento">
      <h2>Adicionar Equipamento</h2>

      <form className="formulario-equipamento">
        <div className="linha-principal">
          <div className="upload-foto">
            SUBIR FOTO
          </div>
          <div className="coluna-inputs">
            <label>* Nome Equipamento</label>
            <Input type="text" placeholder="Nome do equipamento" />

            <label>* Nome Fabricante</label>
            <Input type="text" placeholder="Nome do fabricante" />

            <label>* Quantidade no Estoque</label>
            <div className="estoque-contador">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
          </div>
        </div>

        <div className="descricao-section">
          <label>* Descrição do Equipamento</label>
          <textarea placeholder="Descrição..." />
        </div>

        <div className="url-section">
          <label>* Link do Fabricante</label>
          <Input type="url" placeholder="URL..." />
        </div>

        <p className="info-obrigatorio">* Preenchimento Obrigatório</p>
      </form>

      <div className="botao-container">
        <button type="button" className="botao-adicionar">ADICIONAR</button>
      </div>
    </div>
  );
}
