import * as express from 'express'
import AuthController from './controllers/authController/authController'
import { authMiddleware } from '../util'

const v1 = express.Router()

v1.post('/login', authMiddleware, AuthController.login)
v1.post('/register', AuthController.register)

export default v1
