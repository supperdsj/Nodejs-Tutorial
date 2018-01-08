const expect = require('expect');
const {isRealString} = require('./validation.js');

describe('isRealString', () => {
    it('should reject no-string values', () => {
        expect(isRealString(98)).toBe(false);
    });
    it('should reject empty str', () => {
        expect(isRealString('')).toBe(false);
    });
    it('should reject only spaces', () => {
        expect(isRealString('    ')).toBe(false);
    });
    it('should allow string with non-space charaters', () => {
        expect(isRealString('good string')).toBe(true);
    });
    it('should allow string with space charaters', () => {
        expect(isRealString(' good string   ')).toBe(true);
    });
});