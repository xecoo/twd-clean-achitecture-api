import { UserRepository } from '@/application/usecases/ports'
import { UserData } from '@/domain/entities'
import { MongoHelper } from '@/infra/repository/mongodb/helper'

export class MongodbUserRepository implements UserRepository {
  async add(user: UserData): Promise<void> {
    const userCollection = MongoHelper.getCollection('users')
    const exists = await this.exists(user)
    if (!exists) {
      await userCollection.insertOne(user)
    }
  }

  async findUserByEmail(email: string): Promise<UserData> {
    const userCollection = MongoHelper.getCollection('users')
    const result = await userCollection.findOne({ email: email })
    return result
  }

  findAllUsers(): Promise<UserData[]> {
    throw new Error('Mehod not implemented. ')
  }

  async exists(user: UserData): Promise<boolean> {
    const result = await this.findUserByEmail(user.email)
    if (result != null) {
      return true
    }
    return false
  }
}
