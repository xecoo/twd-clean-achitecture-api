import { UserRepository } from '@/application/usecases/ports'
import { RegisterUserOnMailingList } from '@/application/usecases/register-user-on-mailing-list'
import { UserData } from '@/domain/entities'
import { InMemoryUserRepository } from '@tests/infra/repository'

describe('Register user on mailing list use case', async () => {
  test('Should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    console.log(users)
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const response = await usecase.perform({ name, email })
    const user = await repo.findUserByEmail('any@email.com')
    expect((user).name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })

  test('Should not add user with invalid email to mailing list', async () => {
    const users: UserData[] = []
    console.log(users)
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const invalidEmail = 'invalid_email'
    const response = (await usecase.perform({ name, email: invalidEmail })).value as Error
    const user = await repo.findUserByEmail('any@email.com')
    expect((user)).toBeNull()
    expect(response.name).toEqual('InvalidEmailError')
  })

  test('Should not add user with invalid name to mailing list', async () => {
    const users: UserData[] = []
    console.log(users)
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const invalidName = ''
    const email = 'any@email.com'
    const response = (await usecase.perform({ name: invalidName, email: email })).value as Error
    const user = await repo.findUserByEmail(email)
    expect((user)).toBeNull()
    expect(response.name).toEqual('InvalidNameError')
  })
})
