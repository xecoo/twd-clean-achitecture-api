import { Either, left } from '../../crossCutting/either'
import { InvalidEmailError } from '../errors/invalid-email-error'
import { UserData } from '../register-user-on-mailing-list/user-data'
import { Email } from './email'

export class User {
  static create (userData: UserData) : Either<InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email)

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
