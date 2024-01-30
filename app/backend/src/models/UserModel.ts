import { User } from '../Interfaces/UserType';
import { IUserModel } from '../Interfaces/UsersModel';
import SequelizeUser from '../database/models/UsersModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email:string): Promise<User | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;

    return user.dataValues;
  }
}
