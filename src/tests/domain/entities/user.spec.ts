import { left } from '../../../crossCutting/either'
import { User } from '../../../domain/entities/user'
import { InvalidEmailError } from '../../../domain/errors/invalid-email-error'
import { InvalidNameError } from '../../../domain/errors/invalid-name-error'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any_name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError()))
  })

  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = 'O      '
    const error = User.create({ name: invalidName, email: 'any@mail.com' })

    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should not create user with invalid name (too many characters)', () => {
    const invalidName = 'O'.repeat(257)
    const error = User.create({ name: invalidName, email: 'any@mail.com' })

    expect(error).toEqual(left(new InvalidNameError()))
  })
})
