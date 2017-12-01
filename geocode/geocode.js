const request = require('request');

const apiKey='AIzaSyAkeUKSuiRT2kANDXoQ1J56bJE28EnMo7w';

let geocodeAddress = (address, callback) => {
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('unable to connect to google service', null);
        } else if (body.results.length === 0) {
            callback('unable to find the address', null);
        }
        else if (body.status === 'OK') {
            callback(null, {
                address: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            });
        } else {
            callback('unknow error', null);
        }
    });
};
module.exports.geocodeAddress = geocodeAddress;