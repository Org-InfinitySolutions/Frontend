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
        mensagem = "A senha deve ter no mínimo 8 caracteres";
    } else if(!/[A-Z]/.test(senha)){
        mensagem = "A senha deve conter pelo menos uma letra maiúscula";
    } else if(!/[a-z]/.test(senha)){
        mensagem = "A senha deve conter pelo menos uma letra minúscula";
    } else if(!/\d/.test(senha)){
        mensagem = "A senha deve conter pelo menos um número";
    } else if(senha != confirmarSenha){
        mensagem = 'As senhas não coincidem';
    }
    return { invalida: mensagem.length > 0, excecao: mensagem};
}

const validarCampo = (nome) => {
    if (campoVazio(nome)) {
        return { valido: false, mensagem: "Este campo é obrigatório" };
    }    
    return { valido: true, mensagem: "" };
};


const validarNome = (nome) => {
    if (campoVazio(nome)) {
        return { valido: false, mensagem: "Este campo é obrigatório" };
    } else if (nome.trim().length < 4) {
        return { valido: false, mensagem: "O nome deve ter no mínimo 4 caracteres" };
    }
    return { valido: true, mensagem: "" };
};

const validarRG = (rg) => {
    if (campoVazio(rg)) {
        return { valido: false, mensagem: "Este campo é obrigatório" };
    } else if (rg.trim().length < 12) {
        return { valido: false, mensagem: "O RG deve estar completo" };
    }
    return { valido: true, mensagem: "" };
};

const validarCPF = (cpf) => {

    const regex = /^(\d)\1{10}$/;
    const novoCpf = cpf.replaceAll('.', '').replaceAll('-', '');

    if (campoVazio(novoCpf)) {
        return { valido: false, mensagem: "Este campo é obrigatório" };
    } else if (cpf.trim().length < 14) {
        return { valido: false, mensagem: "O CPF deve estar completo" };
    } else if(regex.test(novoCpf)){
        return { valido: false, mensagem: "O CPF é inválido" };
    }
    return { valido: true, mensagem: "" };
};

const validarTelefone = (telefone) => {
    if (campoVazio(telefone)) {
        return { valido: false, mensagem: "Este campo é obrigatório" };
    }
    
    // Remove caracteres não numéricos para validação
    const numeroLimpo = telefone.replace(/\D/g, '');
    
    // Verifica se é um celular válido (considerando o formato brasileiro com DDD + 9 dígitos)
    const regexCelular = /^[1-9]{2}9[0-9]{8}$/;
    
    if (numeroLimpo.length !== 11) {
        return { valido: false, mensagem: "O celular deve ter 11 dígitos (DDD + 9 dígitos)" };
    } else if (!regexCelular.test(numeroLimpo)) {
        return { valido: false, mensagem: "Formato inválido. Use (DDD) 9xxxx-xxxx" };
    }
    
    return { valido: true, mensagem: "" };
};

const validarTelefoneFixo = (telefone) => {
    if (campoVazio(telefone)) {
        return { valido: false, mensagem: "Este campo é obrigatório" };
    }
    
    // Remove caracteres não numéricos para validação
    const numeroLimpo = telefone.replace(/\D/g, '');
      // Verifica se é um telefone fixo válido (considerando o formato brasileiro com DDD + 8 dígitos)
    const regexTelefoneFixo = /^[1-9]{2}[2-5][0-9]{7}$/;
    
    if (numeroLimpo.length !== 10) {
        return { valido: false, mensagem: "O telefone fixo deve ter 10 dígitos (DDD + 8 dígitos)" };
    } else if (!regexTelefoneFixo.test(numeroLimpo)) {
        const primeiroDigito = numeroLimpo.length > 2 ? numeroLimpo[2] : '';
        return { valido: false, mensagem: `Telefone fixo inválido.` };
    }
    
    return { valido: true, mensagem: "" };
};

const validarCNPJ = (cnpj) => {

    const regex = /^\d{14}$/;
    const regex2 = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    const regex3 = /^(\d)\1{13}$/;

    const novoCnpj = cnpj.replaceAll('.', '').replaceAll('/', '').replaceAll('-', '');

    if (campoVazio(cnpj)) {
        return { valido: false, mensagem: "Este campo é obrigatório" };
    } else if (cnpj.trim().length < 18) {
        return { valido: false, mensagem: "O CNPJ deve estar completo" };
    } else if(!regex.test(novoCnpj) || !regex2.test(cnpj) || regex3.test(novoCnpj)){
        return { valido: false, mensagem: "O CNPJ é inválido" };
    }
    return { valido: true, mensagem: "" };
};

const validarCEP = (cep) => {
    if (campoVazio(cep)) {
        return { valido: false, mensagem: "Este campo é obrigatório" };
    } else if (cep.trim().length < 9) {
        return { valido: false, mensagem: "O CEP deve estar completo" };
    }
    return { valido: true, mensagem: "" };
};

const validarNumero = (numero) => {
    if (campoVazio(numero)) {
        return { valido: false, mensagem: "Este campo é obrigatório" };
    } else if (isNaN(numero)) {
        return { valido: false, mensagem: "Digite apenas números" };
    }
    return { valido: true, mensagem: "" };
};

const validarEndereco = (endereco) => {
    if (campoVazio(endereco)) {
        return { valido: false, mensagem: "Este campo é obrigatório" };
    } else if (endereco.trim().length < 3) {
        return { valido: false, mensagem: "O endereço deve ter no mínimo 3 caracteres" };
    }
    return { valido: true, mensagem: "" };
};

const validarEmail = (email) => {
    if (campoVazio(email)) {
        return { valido: false, mensagem: "Este campo é obrigatório" };
    } else if (emailInvalido(email)) {
        return { valido: false, mensagem: "O e-mail informado é inválido" };
    }
    return { valido: true, mensagem: "" };
};

const validarSenha = (senha) => {
    if (campoVazio(senha)) {
        return { valido: false, mensagem: "Este campo é obrigatório" };
    } else if (senha.length < 8) {
        return { valido: false, mensagem: "A senha deve ter no mínimo 8 caracteres" };
    } else if (!/[A-Z]/.test(senha)) {
        return { valido: false, mensagem: "A senha deve conter pelo menos uma letra maiúscula" };
    } else if (!/[a-z]/.test(senha)) {
        return { valido: false, mensagem: "A senha deve conter pelo menos uma letra minúscula" };
    } else if (!/\d/.test(senha)) {
        return { valido: false, mensagem: "A senha deve conter pelo menos um número" };
    }
    return { valido: true, mensagem: "" };
};

const validarConfirmacaoSenha = (confirmarSenha, senha) => {
    if (campoVazio(confirmarSenha)) {
        return { valido: false, mensagem: "Este campo é obrigatório" };
    } else if (senha !== confirmarSenha) {
        return { valido: false, mensagem: "As senhas não coincidem" };
    }
    return { valido: true, mensagem: "" };
};

const validarRazaoSocial = (razaoSocial) => {
    if (campoVazio(razaoSocial)) {
        return { valido: false, mensagem: "Este campo é obrigatório" };
    } else if (razaoSocial.trim().length < 5) {
        return { valido: false, mensagem: "A razão social deve ter no mínimo 5 caracteres" };
    }
    return { valido: true, mensagem: "" };
};

export { 
    campoVazio, 
    emailInvalido, 
    campoNaoAtendeTamanho, 
    senhaInvalida,
    validarNome,
    validarRG,
    validarCPF, 
    validarTelefone,
    validarTelefoneFixo,
    validarCNPJ,
    validarCEP,
    validarNumero,
    validarEndereco,
    validarEmail,
    validarSenha,
    validarConfirmacaoSenha,
    validarRazaoSocial,
    validarCampo
}