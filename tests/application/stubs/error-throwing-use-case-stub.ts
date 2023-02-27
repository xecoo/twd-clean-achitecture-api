import { UseCase } from "@/application/usecases/ports";

export class ErrorThrowingUseCaseStub implements UseCase {
    perform (request: any): Promise<void> {
        throw Error()
    }
}