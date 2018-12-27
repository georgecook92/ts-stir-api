import * as bcryptjs from 'bcryptjs'
import { password } from '.';

export const hashPassword = (password: string) : string => bcryptjs.hashSync(password, 10)

export const comparePassword = (password: string, hashPassword: string): boolean => bcryptjs.compareSync(password, hashPassword)