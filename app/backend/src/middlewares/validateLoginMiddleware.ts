import { Request, Response, NextFunction } from 'express';

export default class Validations {
  static validateLoginMiddleware(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!password || !email) return res.status(400).json({ message: 'All fields must be filled' });
    if (password.length < 6) return res.status(401).json({ message: 'Invalid email or password' });
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    if (regex.test(email)) return res.status(401).json({ message: 'Invalid email or password' });
    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token not found' });
    if (token.length !== 16) return res.status(401).json({ message: 'Token invalid' });
    next();
  }
}
