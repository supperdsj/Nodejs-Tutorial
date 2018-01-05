const expect = require('expect');
const {generateMessage} = require('./message.js');

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
});