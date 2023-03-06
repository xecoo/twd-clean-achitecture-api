import express from 'express'
import setupMiddleware from '@/application/main/config/middleware'
import setupRoutes from '@/application/main/config/routes'

const app = express()
setupMiddleware(app)
setupRoutes(app)

export default app
