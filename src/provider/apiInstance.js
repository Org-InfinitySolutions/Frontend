
import axios from "axios";
import { ENDPOINTS } from "../routers/endpoints";

const apiAutenticacao = axios.create({
    baseURL: import.meta.env.VITE_ENDERECO_API_AUTH
})

apiAutenticacao.interceptors.request.use(
    config => {
        const token = sessionStorage.TOKEN;
        const isExcludedRoute = [ENDPOINTS.LOGIN, ENDPOINTS.RESETSENHACONFIRMAR, ENDPOINTS.RESETSENHASOLICITAR, ENDPOINTS.EMAILVERIFICAR].some(route => config.url.includes(route));

        if(token && !isExcludedRoute){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

const api = axios.create({
    baseURL: import.meta.env.VITE_ENDERECO_API
})

api.interceptors.request.use(
    config => {
        const token = sessionStorage.TOKEN;

        const urlPath = new URL(config.url, window.location.origin).pathname;
        const isExcludedRoute = [ENDPOINTS.VALIDARCODIGOEMAIL, ENDPOINTS.ENVIARCODIGOEMAIL, ENDPOINTS.PRODUTOS, ENDPOINTS.PRODUTOID, ENDPOINTS.CRIARUSUARIO].some(route => urlPath.startsWith(route));

        if(token && !isExcludedRoute){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

export { apiAutenticacao, api }