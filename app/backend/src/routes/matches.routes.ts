import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
// import Validations from '../middlewares/validateLoginMiddleware';

const teamController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamController.getAllMatches(req, res));
// router.use(Validations.validateToken);

export default router;
