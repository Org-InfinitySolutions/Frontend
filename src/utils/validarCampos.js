
const campoVazio = (campo) => {
    return campo.trim().length <= 0;
}

const emailInvalido = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(email);
}

const campoNaoAtendeTamanho = (campo, tamanho) => {
    return campo.trim().length < tamanho;
} 

const senhaInvalida = (senha, confirmarSenha) => {
    
    let mensagem = '';
    if(senha.length < 8){
        mensagem = "A senha deve ter ao menos 8 caracteres";
    } else if(senha.indexOf("@") < 0 && senha.indexOf("&") < 0 && senha.indexOf("#") < 0 && senha.indexOf("$") < 0 && senha.indexOf("%") < 0){
        mensagem = "A senha deve ter ao menos um caractere especial (@, &, #, $, %)";
    } else if(!/\d/.test(senha)){
        mensagem = "A senha deve conter ao menos um número";
    } else if(senha != confirmarSenha){
        mensagem = 'As senhas não coincidem';
    }
    return { invalida: mensagem.length > 0, excecao: mensagem};
}

export { campoVazio, emailInvalido, campoNaoAtendeTamanho, senhaInvalida }