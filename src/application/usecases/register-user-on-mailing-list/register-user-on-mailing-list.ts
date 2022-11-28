import { UserRepository } from '../../application/usecases/ports/user-repository'
import { Either, left, right } from '../../crossCutting/either'
import { User } from '../entities/user'
import { InvalidEmailError } from '../errors/invalid-email-error'
import { InvalidNameError } from '../errors/invalid-name-error'
import { UserData } from './user-data'

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
