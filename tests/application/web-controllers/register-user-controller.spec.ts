import { UserRepository } from "@/application/usecases/ports"
import { RegisterUserOnMailingList } from "@/application/usecases/register-user-on-mailing-list"
import { MissingParamError } from "@/application/web-controllers/errors/errors"
import { HttpRequest, HttpResponse, RegisterUserController } from "@/application/web-controllers/ports"
import { UserData } from "@/domain/entities"
import { InvalidEmailError, InvalidNameError } from "@/domain/errors"
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

    test('Should return status code 400 when request contains invalid name', async () => {
        const requestInvalidName: HttpRequest = {
            body: {
                name: 'A',
                email: 'any@mail.com'
            }
        }
        const users: UserData[] = []
        const repo: UserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const controller: RegisterUserController = new RegisterUserController(usecase)
        const response: HttpResponse =await  controller.handle(requestInvalidName)
        expect(response.statusCode).toEqual(400)
        expect(response.body).toBeInstanceOf(InvalidNameError)
    })

    test('Should return status code 400 when request contains invalid email', async () => {
        const requestInvalidName: HttpRequest = {
            body: {
                name: 'Any name',
                email: 'invalid_email.com'
            }
        }
        const users: UserData[] = []
        const repo: UserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const controller: RegisterUserController = new RegisterUserController(usecase)
        const response: HttpResponse =await  controller.handle(requestInvalidName)
        expect(response.statusCode).toEqual(400)
        expect(response.body).toBeInstanceOf(InvalidEmailError)
    })

    test('Should return status code 400 when request contains missing param name', async () => {
        const requestInvalidName: HttpRequest = {
            body: {
                email: 'any@mail.com'
            }
        }
        const users: UserData[] = []
        const repo: UserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const controller: RegisterUserController = new RegisterUserController(usecase)
        const response: HttpResponse =await  controller.handle(requestInvalidName)
        expect(response.statusCode).toEqual(400)
        expect((response.body as Error).message).toEqual("Missing parameter for request: name")
    })

    test('Should return status code 400 when request contains missing param email', async () => {
        const requestInvalidName: HttpRequest = {
            body: {
                name: 'Any name'
            }
        }
        const users: UserData[] = []
        const repo: UserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const controller: RegisterUserController = new RegisterUserController(usecase)
        const response: HttpResponse =await  controller.handle(requestInvalidName)
        expect(response.statusCode).toEqual(400)
        expect((response.body as Error).message).toEqual("Missing parameter for request: email")
    })

    test('Should return status code 400 when request contains missing param email', async () => {
        const requestInvalidName: HttpRequest = {
            body: {
            }
        }
        const users: UserData[] = []
        const repo: UserRepository = new InMemoryUserRepository(users)
        const usecase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repo)
        const controller: RegisterUserController = new RegisterUserController(usecase)
        const response: HttpResponse =await  controller.handle(requestInvalidName)
        expect(response.statusCode).toEqual(400)
        expect((response.body as Error).message).toEqual("Missing parameter for request: name email")
    })
})