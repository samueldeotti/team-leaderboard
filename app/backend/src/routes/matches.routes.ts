import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';

const teamController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamController.getAllMatches(req, res));

export default router;
