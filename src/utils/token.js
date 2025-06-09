
const tokenExpirou = () => {
    return new Date() > new Date(sessionStorage.EXP);
}

export { tokenExpirou }