import { UserRepository } from "@/application/usecases/ports"
import { RegisterUserOnMailingList } from "@/application/usecases/register-user-on-mailing-list"
import { HttpRequest, HttpResponse, RegisterUserController } from "@/application/web-controllers/ports"
import { UserData } from "@/domain/entities"
import { InMemoryUserRepository } from "@tests/infra/repository"

describe('Register user web controller', () => {
    test('Should return status code 201 when request contains valid user data', async () => {
        const request: HttpRequest = {
            body: {
                name: 'Any Name',
                email: 'any@mail.com'
            }
        }
        const users: UserData[] = []
        const repo: UserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const controller: RegisterUserController = new RegisterUserController(usecase)
        const response: HttpResponse =await  controller.handle(request)
        expect(response.statusCode).toEqual(201)
        expect(response.body).toEqual(request.body)
    })
})
