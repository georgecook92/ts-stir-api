import { Request, Response } from "express"
import { LoginType } from "./types"
import { isLeft } from "fp-ts/lib/Either"

import UserRepository from '../../repositories/UserRepository'
import { getCustomRepository } from "typeorm";
import { jwt } from '../../../util';

class AuthController {
  login = async (req: Request, res: Response) => {
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
}

export default AuthController
