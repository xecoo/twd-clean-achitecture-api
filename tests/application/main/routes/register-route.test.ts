import request from 'supertest'
import app from '@/application/main/config/app'

describe('Register routes', () => { 
    test('should return an account with success',async () => { 
        app.post('/test_cors', (req, res) => {
            res.send()
        })
        await request(app)
            .post('/api/register')
            .send({
                name: 'Any name',
                email: 'any@mail.com'
        })
        .expect(201)
    })
})
 