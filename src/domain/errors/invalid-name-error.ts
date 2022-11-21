export class InvalidNameError extends Error {
  public readonly name = 'InvalidNameError'

  constructor (name: string) {
    super('InvalidName: ' + name + '.')
  }
}
