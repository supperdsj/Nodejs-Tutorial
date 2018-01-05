const expect = require('expect');
const {generateMessage,generateLocation} = require('./message.js');

describe('generateMessage', () => {
    it('should generate correct message obejct', () => {
        const from='dongsj';
        const text='some message';
        const message=generateMessage(from,text);

        console.log(typeof message.createAt);

        expect(typeof message.createAt).toBe('number');
        expect(message).toInclude({
            from,
            text
        });
    });
});describe('generateLocation', () => {
    it('should generate correct location obejct', () => {
        const from='dongsj';
        const latitude=Math.random()*100;
        const longitude=Math.random()*100;
        const url=`https://www.google.com/maps?q=${latitude},${longitude}`;

        const message=generateLocation(from,latitude,longitude);

        expect(typeof message.createAt).toBe('number');
        expect(message.url).toBe(url);
        expect(message).toInclude({
            from,
            latitude,
            longitude
        });
    });
});