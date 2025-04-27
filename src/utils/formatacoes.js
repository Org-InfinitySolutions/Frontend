
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
    // Remove todos os caracteres não numéricos
    const numeroLimpo = telefone.replace(/\D/g, '');
    
    if (numeroLimpo.length === 0) return '';
    
    // Formata celular (com o 9 na frente após o DDD)
    if (numeroLimpo.length <= 2) {
        // Apenas DDD
        return `(${numeroLimpo}`;
    } else if (numeroLimpo.length <= 7) {
        // DDD + primeiros dígitos
        return `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo.slice(2)}`;
    } else {
        // Formato completo para celular: (99) 99999-9999
        return `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo.slice(2, 7)}-${numeroLimpo.slice(7, 11)}`;
    }
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
    const numeroLimpo = telefone.replace(/\D/g, '');
    
    if (numeroLimpo.length === 0) return '';
    
    if (numeroLimpo.length <= 2) {
        return `(${numeroLimpo}`;
    } else if (numeroLimpo.length <= 6) {
        return `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo.slice(2)}`;
    } else {
        return `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo.slice(2, 6)}-${numeroLimpo.slice(6, 10)}`;
    }
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