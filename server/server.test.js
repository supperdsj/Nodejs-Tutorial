const request = require('supertest');
const expect = require('expect');

let app = require('./server').app;

describe('Express server', () => {
    it('should return hello world response', (done) => {
        request(app)
            .get('/')
            // .expect(200)
            // .expect('hello world')
            .expect(404)
            .expect((res) => {
                expect(res.body).toInclude({
                    error: 'Page not found.'
                });
            })
            // .expect(404)
            // .expect({
            //     error:'Page not found.'
            // })
            .end(done);
    });


    it('should return users', (done) => {
        request(app)
            .get('/users')
            .expect(200)
            .expect((res) => {
                expect(res.body).toInclude({
                    name: 'dongsj',
                    age: 27
                });
            })
            .end(done);
    });
});