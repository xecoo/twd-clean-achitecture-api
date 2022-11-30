import { Either, left, right } from '../../../crossCutting'
import { InvalidEmailError, InvalidNameError } from '../../../domain/errors'
import { UserRepository } from '../ports'
import { User, UserData } from '../../../domain/entities'

export class RegisterUserOnMailingList {
  private readonly userRepo: UserRepository

  constructor (userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  public async registerUserOnMailingList (
    request: UserData
  ): Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> =
      User.create(request)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    if (!(await this.userRepo.exists(request))) {
      await this.userRepo.add(request)
    }

    return right(request)
  }
}
