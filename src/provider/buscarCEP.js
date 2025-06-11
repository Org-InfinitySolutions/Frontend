
import axios from "axios";

const buscarEndereco = async (cep) => {

    const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (res.data.erro !== "true") {
        return { valido: true, objeto: res.data };
    }
    return { valido: false, mensagem: 'CEP não encontrado' }
}

export { buscarEndereco }