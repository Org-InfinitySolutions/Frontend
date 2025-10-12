
const retornarCargos = (cargo) => {
    if(cargo != null){
        return cargo.split(', ');
    }
    return [];
}

const isAdmin = (cargos) => {
    return cargos.includes("ROLE_ADMIN");
}

const isFuncionario = (cargos) => {
    return cargos.includes("ROLE_FUNCIONARIO");
}

const isUsuarioPf = (cargos) => {
    return cargos.includes("ROLE_USUARIO_PF");
}

const isUsuarioPj = (cargos) => {
    return cargos.includes("ROLE_USUARIO_PJ");
}

export { retornarCargos, isAdmin, isFuncionario, isUsuarioPf, isUsuarioPj }