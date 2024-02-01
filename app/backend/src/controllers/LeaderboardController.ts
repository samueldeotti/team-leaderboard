import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getLeaderboard(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getLeaderboard();
    return res.status(200).json(serviceResponse.data);
  }
}
