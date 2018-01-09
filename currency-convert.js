const axios = require('axios');

// const getExchangeRage = (from, to) => {
//     return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
//         return response.data.rates[to];
//     });
// };
const getExchangeRage = async (from, to) => {
    return (await axios.get(`http://api.fixer.io/latest?base=${from}`)).data.rates[to];
};

// const getCounties = (currencyCode) => {
//     return axios.get(`http://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//         return response.data.map((country) => {
//             return country.name;
//         });
//     });
// };
const getCounties = async (currencyCode) => {
    return (await axios.get(`http://restcountries.eu/rest/v2/currency/${currencyCode}`)).data.map((country) =>country.name);
};

// const convertCurrency = (from, to, amount) => {
//     let countries;
//     return getCounties(to).then((countriesTemp) => {
//         countries = countriesTemp;
//         return getExchangeRage(from, to);
//     }).then((rate) => {
//         const exchangedAmount = amount * rate;
//         return {amount, exchangedAmount, from, to, countries};
//     });
// };

const convertCurrency = async (from, to, amount) => {
    let countries, exchangedAmount;
    countries = await getCounties(to);
    exchangedAmount = amount * await getExchangeRage(from, to);
    return {amount, exchangedAmount, from, to, countries};
};
getExchangeRage('CNY','USD').then(console.log);
// getCounties('CNY').then(console.log);
// convertCurrency('CNY', 'USD', 100).then(console.log);

