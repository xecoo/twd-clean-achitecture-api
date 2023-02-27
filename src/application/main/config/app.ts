import express from 'express'
import setupMiddleware from '@/application/main/config/middleware'

const app = express()
setupMiddleware(app)

export default app
