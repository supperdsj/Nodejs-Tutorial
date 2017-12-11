const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {

    it('should add two numbers', () => {
        let result = utils.add(33, 11);
        expect(result).toBe(44).toBeA('number');
        // if (result !== 44) {
        //     throw new Error('add value not correct');
        // }
    });
    it('should add two numbers(async)', (done) => {
        let result = utils.asyncAdd(33, 11, (result) => {
            expect(result).toBe(44).toBeA('number');
            done();
        });
    });
    it('should square a numbers', () => {
        let result = utils.square(3);
        expect(result).toBe(9).toBeA('number');
        // if (result !== 9) {
        //     throw new Error('square value not correct');
        // }
    });
    it('verify fullname', () => {
        expect(utils.setName({name: 'dong sj'}, 'dong sj')).toInclude({firstName: 'dong'}).toInclude({lastName: 'sj'});
    });
// it('should expect some values', () => {
//     expect(12).toNotBe(11);
//     // expect({name: 'dongsj'}).tobe({name: 'dongsj'});
//     expect({name: 'dongsj'}).toEqual({name: 'dongsj'});
//     expect({name: 'dongsj'}).toNotEqual({name: 'dongsj1'});
//     expect([2, 3, 4]).toInclude(3);
//     expect([2, 3, 4]).toExclude(5);
//     expect({
//         name: 'dongsj',
//         age: 27,
//         location: 'Beijing'
//     }).toInclude({
//         age: 27
//     });
//
// });

});