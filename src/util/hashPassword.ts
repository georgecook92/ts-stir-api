import * as bcryptjs from 'bcryptjs'
import { password } from '.';

export const hashPassword = (password: string) : string => bcryptjs.hashSync(password, 10)

export const comparePassword = (password: string, hashPassword: string): boolean => {
  const result = bcryptjs.compareSync(password, hashPassword)
  return result
}