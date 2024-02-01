import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.userService.login(email, password);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  public static async getRole(_req: Request, res: Response) {
    const { role } = res.locals.auth;
    return res.status(200).json({ role });
  }
}
