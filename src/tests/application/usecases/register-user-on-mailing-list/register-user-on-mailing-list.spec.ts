import { UserData } from '../../../../domain/register-user-on-mailing-list/user-data'

describe('Register user on mailing list use case', () => {
  test('Should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    console.log(users)
    // const repo: UserRepository = new InMemoryUserRepository(users)
    // const usecase: RegisteruserOnMailingList = new RegisterUserOnMailingList(repo)
    // const name = 'any_name'
    // const email = 'any@email.com'
    // const response = await usecase.RegisterUserOnMailingList({ name, email })
    // const user = repo.findUserByEmail('any@email.com')
    // expect((await user).name).toBe('any_name')
  })
})
