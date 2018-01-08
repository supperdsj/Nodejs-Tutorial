const moment=require('moment');

const generateMessage = (from, text) => {
    return {
        createAt: moment().valueOf(),
        from,
        text
    }
};
const generateLocation = (from, latitude, longitude) => {
    return {
        createAt: moment().valueOf(),
        from, latitude, longitude,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`
    }
};
module.exports = {generateMessage, generateLocation};