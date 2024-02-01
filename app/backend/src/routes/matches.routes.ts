import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/validateLoginMiddleware';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));
// router.use(Validations.validateToken);
router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);
router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
