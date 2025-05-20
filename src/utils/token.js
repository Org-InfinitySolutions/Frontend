
const tokenExpirou = () => {
    return new Date() > sessionStorage.EXP;
}

export { tokenExpirou }