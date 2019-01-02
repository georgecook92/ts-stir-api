import { EntityRepository, Repository } from "typeorm"
import { User } from "../../models";
import { password as passwordUtil } from "../../util"

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  async isLoginCorrect(email: string, password: string) {
    const user: User | undefined = await this.findOne({ email })
    if (!user) return false
    return passwordUtil.comparePassword(password, user.password)
  }
}