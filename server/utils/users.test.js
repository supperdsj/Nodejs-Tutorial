const expect = require('expect');
const {Users} = require('./users.js');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'dongsj',
            room: 'warming room'
        }, {
            id: '2',
            name: 'wx',
            room: 'warming room'
        }, {
            id: '3',
            name: 'somebody',
            room: 'not warming room'
        }]
    });
    it('should add a new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'dongsj',
            room: 'warming room'
        };
        const resUsers = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
    it('should return names', () => {
        let userList = users.getUserList('warming room');
        expect(userList).toEqual(['dongsj', 'wx']);
    });
    it('should remove user', () => {
        const userId = '1';
        const user = users.removeUser(userId);
        expect(users.users.length).toBe(2);
        expect(user.id).toBe(userId);
    });
    it('should not remove user', () => {
        const userId = '998';
        const user = users.removeUser(userId);
        expect(users.users.length).toBe(3);
        expect(user).toNotExist();
    });
    it('should find user', () => {
        const userId = '1';
        const user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        const userId = '998';
        const user = users.getUser(userId);
        expect(user).toNotExist();
    });
});