import { UserRepository } from '../../../../application/usecases/ports/user-repository'
import { RegisterUserOnMailingList } from '../../../../domain/register-user-on-mailing-list/register-user-on-mailing-list'
import { UserData } from '../../../../domain/register-user-on-mailing-list/user-data'
import { InMemoryUserRepository } from '../../../../infra/repository/in-memory-user-repository'

describe('Register user on mailing list use case', () => {
  test('Should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    console.log(users)
    const repo: UserRepository = new InMemoryUserRepository(users)
    const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
    const name = 'any_name'
    const email = 'any@email.com'
    const response = await usecase.registerUserOnMailingList({ name, email })
    const user = repo.findUserByEmail('any@email.com')
    expect((await user).name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })
})
