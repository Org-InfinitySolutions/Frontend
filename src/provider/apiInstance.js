
import axios from "axios";

const apiAutenticacao = axios.create({
    baseURL: import.meta.env.VITE_ENDERECO_API_AUTH
})

const api = axios.create({
    baseURL: import.meta.env.VITE_ENDERECO_API
})

export { apiAutenticacao, api }