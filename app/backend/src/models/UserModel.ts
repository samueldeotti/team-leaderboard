import { User } from '../Interfaces/User/UserType';
import { IUserModel } from '../Interfaces/User/UsersModel';
import SequelizeUser from '../database/models/UsersModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email:string): Promise<User | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;

    return user.dataValues;
  }
}
