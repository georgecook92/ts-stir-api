import * as jwt from 'jsonwebtoken'

export const sign = (id: string, expiresIn: string) => jwt.sign({
  id
}, 'secret', { expiresIn})
