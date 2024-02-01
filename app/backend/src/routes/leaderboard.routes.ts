import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderboardController';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get(
  '/:subroute?',
  (req: Request, res: Response) => leaderBoardController.getLeaderboard(req, res),
);

export default router;
