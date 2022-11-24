import { InvalidNameError } from '../errors/invalid-name-error'
import { Either, left, right } from '../../crossCutting/either'

export class Name {
  public readonly value: string

  private constructor (name: string) {
    this.value = name
  }

  static create (name: string): Either<InvalidNameError, Name> {
    if (!Name.validate(name)) {
      return left(new InvalidNameError(name))
    }

    return right(new Name(name))
  }

  public static validate (name: string): boolean {
    if (!name) return false

    if (name.trim().length < 2 || name.trim().length > 256) return false

    return true
  }
}
