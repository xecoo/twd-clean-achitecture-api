import { MongodbUserRepository } from '@/infra/repository/mongodb'
import { MongoHelper } from '@/infra/repository/mongodb/helper'

describe('MongoDb User repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.Mongo_Url)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        MongoHelper.clearCollection('users')
    })

    test('when user is added, it should exist', async () => {
        const userRepository = new MongodbUserRepository()
        const user = {
            name: 'any_name',
            email:'any@mail.com'
        }
        await userRepository.add(user)
        expect(await userRepository.exists(user)).toBeTruthy()
    })
})