
const campoVazio = (campo) => {
    return campo.trim().length <= 0;
}

const emailInvalido = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !regex.test(email);
}

export { campoVazio, emailInvalido }