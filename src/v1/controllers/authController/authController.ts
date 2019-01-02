import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import * as joi from 'joi'

import { LoginType, RegisterType } from './types'
import { isLeft } from 'fp-ts/lib/Either'

import UserRepository from '../../repositories/UserRepository'
import { jwt, password as passwordUtil } from '../../../util'
import { User } from '../../../models'
import { RequestWithUserId } from '../../../types'

class AuthController {
  login = async (req: RequestWithUserId, res: Response) => {
    const result = LoginType.decode(req.body)
    
    if (isLeft(result)) {
      res.status(400).json({ error: 'Invalid request body' })
    } else {
      const { email, password } = result.value
      const userRepo = getCustomRepository(UserRepository)
      const isLoginCorrect = await userRepo.isLoginCorrect(email, password)
      if (isLoginCorrect) {
        const user = await userRepo.findOne({ email })
        const userId = user && user.id ? user.id : ''
        res.json({ token: jwt.sign(userId, '1hr') })
      } else {
        res.status(401).json({ error: 'Unauthorised' })
      }
    }
  }

  register = async (req: Request, res: Response) => {
    const result = RegisterType.decode(req.body)

    if (isLeft(result)) {
      res.status(400).json({ error: 'Invalid request body' })
    } else {
      const userRepo = getCustomRepository(UserRepository)

      await userRepo.save(new User({ ...result.value, password: passwordUtil.hashPassword(result.value.password) }))

      res.json({ success: true })
    }
  }
}

export default new AuthController()
