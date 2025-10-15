import { isAdmin, isFuncionario } from './usuario';

const tokenExpirou = () => {
    return new Date() > new Date(sessionStorage.EXP);
}

// Este método deve ser executado em paginas onde qualquer usuario logado possa acessar
// Executar função 'exibirAvisoTokenExpirado()' para exibir a mensagem
const bloquearAcessoUsuario = () => {
    if(sessionStorage.TOKEN != null){
        if(!tokenExpirou()){
            return false;
        }
    }

    return true;
}

// Este método deve ser executado em paginas onde apenas a gerencia pode acessar
// Executar funcão 'exibirAvisoAcessoNegado()' para exibir a mensagem
const bloquearAcessoGerencia = (permitirFuncionario) => {
    if(!bloquearAcessoUsuario()){
        if(isAdmin(sessionStorage.CARGO) || (isFuncionario(sessionStorage.CARGO) && permitirFuncionario)){
            return false;
        } 
    }

    return true;
}

export { tokenExpirou, bloquearAcessoUsuario, bloquearAcessoGerencia }