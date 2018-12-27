import { EntityRepository, Repository } from "typeorm"
import { User } from "../models";
import { password as passwordUtil } from "..//util"

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async isLoginCorrect(email: string, password: string) {
    const user: User | undefined = await this.findOne({ email })
    const usersPassword = user ? user.password : ''
    return passwordUtil.comparePassword(password, usersPassword)
  }

}