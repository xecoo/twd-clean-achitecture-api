import { Either, left } from '../../crossCutting/either'
import { InvalidEmailError } from '../errors/invalid-email-error'
import { InvalidNameError } from '../errors/invalid-name-error'
import { UserData } from '../register-user-on-mailing-list/user-data'
import { Email } from './email'
import { Name } from './name'

export class User {
  static create (
    userData: UserData
  ): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name)

    if (nameOrError.isLeft()) {
      return left(new InvalidEmailError())
    }

    const emailOrError = Email.create(userData.email)

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
