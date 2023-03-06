import { Express } from 'express'
import { bodyParser } from '@/application/main/config/middleware/body-parser'
import { cors } from '@/application/main/config/middleware/cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
