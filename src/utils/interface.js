
// ex.: const dispositivo = getDevice().mobile;
const getDevice = () => ({
    mobile: window.innerWidth <= 768,
    tablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    desktop: window.innerWidth > 1024,
});

export { getDevice }