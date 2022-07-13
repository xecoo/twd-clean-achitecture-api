import { InMemoryUserRepository } from '../../repository/in-memory-user-repository'
import { UserData } from '../../usecases/register-user-on-mailing-list/user-data'

describe('In Memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const userRepo = new InMemoryUserRepository(users)
    const user = await userRepo.findUserByEmail('any@email.com')
    expect(user).toBeNull()
  })
})
