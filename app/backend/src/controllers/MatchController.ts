import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (!inProgress) {
      const serviceResponse = await this.matchService.getAllMatches();
      return res.status(200).json(serviceResponse.data);
    }

    const serviceResponse = await this.matchService.getFiltredMatches(inProgress as string);

    return res.status(200).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    await this.matchService.finishMatch(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await this.matchService.updateMatch(Number(homeTeamGoals), Number(awayTeamGoals), Number(id));

    return res.status(200).json({ message: 'Updated' });
  }

  public async createMatch(req: Request, res: Response) {
    const { status, data } = await this.matchService
      .createMatch(req.body);

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
