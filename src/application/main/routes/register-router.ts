import { Router } from 'express'
import { makeRegisterUserController } from '@/application/main/factories/'
import { adaptRoute } from '@/application/main/adapters/'

export default (router: Router): void => {
    router.post('/register', adaptRoute(makeRegisterUserController()))
}