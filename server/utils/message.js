const generateMessage = (from, text) => {
    return {
        createAt: +new Date(),
        from,
        text
    }
};
const generateLocation = (from, latitude, longitude) => {
    return {
        createAt: +new Date(),
        from, latitude, longitude,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`
    }
};
module.exports = {generateMessage, generateLocation};