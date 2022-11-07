import { UserRepository } from '../../../../application/usecases/ports/user-repository'
import { left } from '../../../../crossCutting/either'
import { InvalidEmailError } from '../../../../domain/errors/invalid-email-error'
import { InvalidNameError } from '../../../../domain/errors/invalid-name-error'
import { RegisterUserOnMailingList } from '../../../../domain/register-user-on-mailing-list/register-user-on-mailing-list'
import { UserData } from '../../../../domain/register-user-on-mailing-list/user-data'
import { InMemoryUserRepository } from '../../../../infra/repository/in-memory-user-repository'

describe('Register user on mailing list use case', async () => {
  test('Should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    console.log(users)
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const response = await usecase.registerUserOnMailingList({ name, email })
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
    const response = await usecase.registerUserOnMailingList({ name, email: invalidEmail })
    const user = await repo.findUserByEmail('any@email.com')
    expect((user)).toBeNull()
    expect(response).toEqual(left(new InvalidEmailError()))
  })

  test('Should not add user with invalid name to mailing list', async () => {
    const users: UserData[] = []
    console.log(users)
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const invalidName = ''
    const email = 'any@email.com'
    const response = await usecase.registerUserOnMailingList({ name: invalidName, email: email })
    const user = await repo.findUserByEmail(email)
    expect((user)).toBeNull()
    expect(response).toEqual(left(new InvalidNameError()))
  })
})
