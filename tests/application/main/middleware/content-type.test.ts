import request from 'supertest'
import app from '@/application/main/config/app'

describe('Content type Middleware', () => {
    test('Should return defautl content-type as json', async () => {
        app.get('/test_content_type', (req, res) => {
            res.send('')
        })
        await request(app)
            .get('/test_content_type')
            .expect('content-type', /json/)

    })

    test('Should return defautl content-type as xml', async () => {
        app.get('/test_content_type_xml', (req, res) => {
            res.type('xml')
            res.send('')
        })
        await request(app)
            .get('/test_content_type_xml')
            .expect('content-type', /xml/)

    })
})