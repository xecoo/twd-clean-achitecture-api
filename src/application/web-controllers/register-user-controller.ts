import { RegisterUserOnMailingList } from "@/application/usecases/register-user-on-mailing-list";
import { UserData } from "@/domain/entities";
import { badRequest, created, serverError } from "@/application/web-controllers/util";
import { HttpRequest, HttpResponse } from "@/application/web-controllers/ports";
import { MissingParamError } from "@/application/web-controllers/errors";
import { UseCase } from "@/application/usecases/ports";

export class RegisterUserController implements UseCase{ 
    private readonly usecase: UseCase

    constructor(usecase: UseCase) {
        this.usecase = usecase
    }
    public async perform (request: HttpRequest): Promise<HttpResponse> {
        try {
            if (!request.body.name || !request.body.email) {
                let missingParam = !(request.body.name) ? 'name ' : ''
                missingParam += !(request.body.email) ? 'email' : ''
                return badRequest(new MissingParamError(missingParam.trim()))
            }
            
            const userData: UserData = request.body
            const response = await this.usecase.perform(userData)

            if (response.isLeft()) {
                return badRequest(response.value)
            }

            if (response.isRight()) {
                const httpResponse: HttpResponse = created(response.value)

                return httpResponse
            }
        } catch (error)
        {
            return serverError(error)
        }
    }
}