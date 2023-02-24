import { RegisterUserOnMailingList } from "@/application/usecases/register-user-on-mailing-list";
import { UserData } from "@/domain/entities";
import { created } from "@/application/web-controllers/util";
import { HttpRequest } from "./http-request";
import { HttpResponse } from "./http-response";

export class RegisterUserController{
    private readonly usecase: RegisterUserOnMailingList

    constructor(usecase: RegisterUserOnMailingList) {
        this.usecase = usecase
    }

    public async handle (request: HttpRequest): Promise<HttpResponse> {
        const userData: UserData = request.body
        const response = await this.usecase.registerUserOnMailingList(userData)

        if (response.isRight()) {
            const httpResponse: HttpResponse = created(response.value)

            return httpResponse
        }
    }
}