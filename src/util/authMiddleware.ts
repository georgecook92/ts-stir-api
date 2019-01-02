import { Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import { RequestWithUserId } from '../types'

export default (req: RequestWithUserId, res: Response, next: NextFunction) => {
  let tokenHeader = req.headers['x-access-token'] || req.headers['authorization']
  let token
  if (tokenHeader && !Array.isArray(tokenHeader) && tokenHeader.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = tokenHeader.replace('Bearer ', '');
  }
  if (token) {
    jwt.verify(token, 'secret', (err, decoded: { id: string }) => {
      if (err) {
        return res.json({
          error: 'Token is not valid'
        })
      } else {
        req.userId = decoded.id
        next()
      }
    })
  } else {
    return res.json({
      error: 'Auth token is not supplied'
    });
  }
}