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

    test('find all users should return all added users', async () => {
        const userRepository = new MongodbUserRepository()
        userRepository.add({
            name: 'any_name',
            email:'any@mail.com'
        })
        userRepository.add({
            name: 'second_name',
            email:'second@mail.com'
        })
        const users = await userRepository.findAllUsers()
        expect(users[0].name).toEqual('any_name')
        expect(users[1].name).toEqual('second_name')
    })
})