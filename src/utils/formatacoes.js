
function formatarCPF(cpf) {
    let cpfFormatado = cpf.replace(/\D/g, '');
    if (cpfFormatado.length <= 3) {
        cpfFormatado = cpfFormatado.replace(/(\d{1,3})/g, '$1');
    } else if (cpfFormatado.length <= 6) {
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (cpfFormatado.length <= 9) {
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else {
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }
    return cpfFormatado;
}

function formatarCNPJ(cnpj) {
    let cnpjFormatado = cnpj.replace(/\D/g, '');
    if (cnpjFormatado.length <= 2) {
        cnpjFormatado = cnpjFormatado.replace(/(\d{2})/, '$1');
    } else if (cnpjFormatado.length <= 5) {
        cnpjFormatado = cnpjFormatado.replace(/(\d{2})(\d{3})/, '$1.$2');
    } else if (cnpjFormatado.length <= 8) {
        cnpjFormatado = cnpjFormatado.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (cnpjFormatado.length <= 12) {
        cnpjFormatado = cnpjFormatado.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1.$2.$3/$4');
    } else {
        cnpjFormatado = cnpjFormatado.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return cnpjFormatado;
}

function formatarTelefone(telefone) {
    let telefoneFormatado = telefone.replace(/\D/g, '');
    if (telefoneFormatado.length <= 2) {
        telefoneFormatado = telefoneFormatado.replace(/(\d{2})/, '($1');
    } else if (telefoneFormatado.length <= 7) {
        telefoneFormatado = telefoneFormatado.replace(/(\d{2})(\d{1,4})/, '($1) $2');
    } else {
        telefoneFormatado = telefoneFormatado.replace(/(\d{2})(\d{1,5})(\d{1,4})/, '($1) $2-$3');
    }
    return telefoneFormatado;
}

function formatarRegistroGeral(rg) {
    let registroGeral = rg.replace(/\D/g, '');
    if (registroGeral.length <= 2) {
        registroGeral = registroGeral.replace(/(\d{2})/, '$1');
    } else if (registroGeral.length <= 5) {
        registroGeral = registroGeral.replace(/(\d{2})(\d{1,3})/, '$1.$2');
    } else if (registroGeral.length <= 8) {
        registroGeral = registroGeral.replace(/(\d{2})(\d{1,3})(\d{1,3})/, '$1.$2.$3');
    } else {
        registroGeral = registroGeral.replace(/(\d{2})(\d{1,3})(\d{1,3})(\d{1})/, '$1.$2.$3-$4');
    }
    return registroGeral;
}

function formatarTelefoneFixo(telefone) {
    let telefoneFormatado = telefone.replace(/\D/g, '');
    if (telefoneFormatado.length <= 2) {
        telefoneFormatado = telefoneFormatado.replace(/(\d{1,2})/, '($1');
    } else if (telefoneFormatado.length <= 6) {
        telefoneFormatado = telefoneFormatado.replace(/(\d{2})(\d{1,4})/, '($1) $2');
    } else {
        telefoneFormatado = telefoneFormatado.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    return telefoneFormatado.trim();
}

function formatarCEP(cep) {
    let cepFormatado = cep.replace(/\D/g, '');
    if (cepFormatado.length <= 5) {
        cepFormatado = cepFormatado.replace(/(\d{1,5})/, '$1');
    } else {
        cepFormatado = cepFormatado.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }
    return cepFormatado;
}


export { formatarCNPJ, formatarCPF, formatarTelefone, formatarRegistroGeral, formatarTelefoneFixo, formatarCEP }