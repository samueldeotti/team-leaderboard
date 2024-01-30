import { Router } from 'express';

import UserController from '../controllers/UserController';

const userController = new UserController();

const router = Router();

router.post('/login', (req, res) => userController.login(req, res));

export default router;
