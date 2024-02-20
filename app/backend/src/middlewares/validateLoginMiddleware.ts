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
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    const token = authorization.split(' ')[1];
    try {
      const secret = process.env.JWT_SECRET ?? 'jwt_secret';
      const payload = jwt.verify(token, secret);
      res.locals.auth = payload;
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
