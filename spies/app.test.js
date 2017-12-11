const expect = require('expect');
const rewire = require('rewire');

const app = rewire('./app');

describe('App', () => {
    const db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);

    it('should call the spy correctly', () => {
        let spy = expect.createSpy();
        // spy();
        // expect(spy).toHaveBeenCalled();
        spy('dongsj', 25);
        expect(spy).toHaveBeenCalledWith('dongsj', 25);
    });
    it('should call saveUser with user object', () => {
        const email = 'dongsj@qq.com';
        const password = '123';
        const password1 = 'aaa';
        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({email, password});
    });
});