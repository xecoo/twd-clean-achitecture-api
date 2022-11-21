// import { left } from '../../../crossCutting/either'
import { User } from '../../../src/domain/entities/user'
// import { InvalidEmailError } from '../../../domain/errors/invalid-email-error'
// import { InvalidNameError } from '../../../domain/errors/invalid-name-error'

describe('User domain entity', () => {
  test('should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any_name', email: invalidEmail }).value as Error
    expect(error.name).toEqual('InvalidEmailError')
    expect(error.message).toEqual('InvalidEmail: ' + invalidEmail + '.')
  })

  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = 'O      '
    const error = User.create({ name: invalidName, email: 'any@mail.com' }).value as Error

    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual('InvalidName: ' + invalidName + '.')
  })

  // test('should not create user with invalid name (too many characters)', () => {
  //   const invalidName = 'O'.repeat(257)
  //   const error = User.create({ name: invalidName, email: 'any@mail.com' })

  //   expect(error).toEqual(left(new InvalidNameError()))
  // })

  // test('should create user with valid date', () => {
  //   const validName = 'any_name'
  //   const validEmail = 'any@email.com'
  //   const user: User = User.create({ name: validName, email: validEmail }).value as User

  //   expect(user.name.value).toEqual(validName)
  //   expect(user.email.value).toEqual(validEmail)
  // })
})
