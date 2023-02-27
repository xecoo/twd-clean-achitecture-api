import { Express } from 'express'
import { bodyParser } from '@/application/main/config/middleware/body-parser'

export default (app: Express): void => {
  app.use(bodyParser)
}
