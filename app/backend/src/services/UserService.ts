import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import { IUserModel } from '../Interfaces/UsersModel';
import { ServiceResponse } from '../types/ServiceResponse';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  private validateEmail(email: string): boolean {

  }

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    // const joi

    // if (joi)
    if (!email || !password) {
      return { status: 'INVALID_DATA', data: { message: 'All fields must be filled' } };
    }

    const user = await this.userModel.findByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string ?? 'jwt_secret');
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
