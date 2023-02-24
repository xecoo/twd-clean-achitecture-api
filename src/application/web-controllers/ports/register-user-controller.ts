import { RegisterUserOnMailingList } from "@/application/usecases/register-user-on-mailing-list";
import { UserData } from "@/domain/entities";
import { badRequest, created } from "@/application/web-controllers/util";
import { HttpRequest } from "./http-request";
import { HttpResponse } from "./http-response";
import { MissingParamError } from "../errors/errors";

export class RegisterUserController{
    private readonly usecase: RegisterUserOnMailingList

    constructor(usecase: RegisterUserOnMailingList) {
        this.usecase = usecase
    }

    public async handle (request: HttpRequest): Promise<HttpResponse> {

        if (!request.body.name || !request.body.email)
        {
            let missingParam = !(request.body.name) ? 'name ' : ''
            missingParam += !(request.body.email) ? 'email' : ''
            return badRequest(new MissingParamError(missingParam.trim()))
        }
            
        const userData: UserData = request.body
        const response = await this.usecase.registerUserOnMailingList(userData)

        if (response.isLeft()) {
            return badRequest(response.value)
        }

        if (response.isRight()) {
            const httpResponse: HttpResponse = created(response.value)

            return httpResponse
        }
    }
}