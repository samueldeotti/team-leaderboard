import { User } from './UserType';

export type UserParams = {
  email: string;
  password: string;
};

export interface IUserModel {
  findByEmail(email: string): Promise<User | null>;
}
