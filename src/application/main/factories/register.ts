import { RegisterUserController } from '@/application/web-controllers/'
import { RegisterUserOnMailingList } from '@/application/usecases/register-user-on-mailing-list/'
import { InMemoryUserRepository } from '@/infra/repository'

export const makeRegisterUserController = (): RegisterUserController => {
    const inMemoryUserRepository = new InMemoryUserRepository([])
    const registerUserOnMailingListUseCase = new RegisterUserOnMailingList(inMemoryUserRepository)
    const registerUserController = new RegisterUserController(registerUserOnMailingListUseCase)
    return registerUserController
}