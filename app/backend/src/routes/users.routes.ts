import { Router, Request, Response } from 'express';
import Validations from '../middlewares/validateLoginMiddleware';
import UserController from '../controllers/UserController';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.validateLoginMiddleware,
  (req: Request, res: Response) => userController.login(req, res),
);

// router.get(
//   '/role',
//   Validations.validateToken,
//   (req: Request, res: Response) => userController.getRole(req, res),
// );

export default router;
