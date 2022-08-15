import { Email } from '../../entities/email'

describe('Email validation', () => {
  test('should not accept null strings', () => {
        const email = null
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept empty strings', () => {
        const email: string = ''
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should accept valid email', () => {
        const email: string = 'email@email.com'
        expect(Email.validate(email)).toBeTruthy()
  })

  test('should not accept local part larger than 64 chars', () => {
    const email: string = 'l'.repeat(65) + '@email.com'
    expect(Email.validate(email)).toBeFalsy()
})
})