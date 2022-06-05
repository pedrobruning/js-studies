const { describe, it } = require('mocha')
const request = require('supertest')
const sut = require('./api')
const assert = require('assert')

describe('API suite test', () => {
    describe('/contact', () => {
        it('should request the contact page and return HTTP status 200', async () => {
            const response = await request(sut)
                        .get('/contact')
                        .expect(200)
            assert.deepStrictEqual(response.text, 'contact page')
        })
    })

    describe('/hello', () => {
        it('should request an inexistent route /hi and redirect to /hello', async () => {
            const response = await request(sut)
                        .get('/hi')
                        .expect(200)            
            assert.deepStrictEqual(response.text, 'Hello World!')
        })
    })

    describe('/login', () => {
        it('should login successfully on the login route and return HTTP Status 200 when passing valid user', async () => {
            const response = await request(sut)
                        .post('/login')
                        .send({ username: 'Phbo', password: '123' })
                        .expect(200)            
            assert.deepStrictEqual(response.text, 'Logged successfully')
        })
        it('should not login successfully on the login route and return HTTP Status 401 when passing invalid user', async () => {
            const response = await request(sut)
                        .post('/login')
                        .send({ username: 'Phbo', password: '323232' })
                        .expect(401)
            
            assert.ok(response.unauthorized)
            assert.deepStrictEqual(response.text, 'Unable to login')
        })
    })
})