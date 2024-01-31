import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default class Validations {
  static validateLoginMiddleware(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!password || !email) return res.status(400).json({ message: 'All fields must be filled' });

    if (password.length < 6) return res.status(401).json({ message: 'Invalid email or password' });

    const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });

    const [type, baererToken] = token.split(' ');

    if (type !== 'Bearer') return res.status(401).json({ message: 'Token malformatted' });

    const decode = jwt.verify(baererToken, process.env.JWT_SECRET as string ?? 'jwt_secret');

    if (!decode) return res.status(401).json({ message: 'Token must be a valid token' });

    next();
  }
}
