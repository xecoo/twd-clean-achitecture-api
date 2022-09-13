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

  test('should not accept local part larger than 320 chars', () => {
    const email: string = 'c'.repeat(64) + '@' + 'c'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part larger than 255 chars', () => {
    const email: string = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part larger than 64 chars', () => {
    const email: string = 'l'.repeat(65) + '@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty local part', () => {
    const email: string = '@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept empty domain part', () => {
    const email: string = 'bruno.pacheco@'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept domain with a part larger than 63 chars', () => {
    const email: string = 'bruno.pacheco@' + 'd'.repeat(64) + '.com'
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not accept local part with invalid char', () => {
    const email = 'any email@email.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
