import { ServiceResponse } from '../types/ServiceResponse';
import { Matches } from '../Interfaces/MatchesType';
import MatchModel from '../models/MatchModel';

type FinishMessage = { message: 'Finished'; };

export type UpdateMessage = { message: 'Updated'; };

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<Matches[]>> {
    const matches = await this.matchModel.findAll();
    if (!matches) return { status: 'NOT_FOUND', data: { message: 'Teams not found' } };

    return { status: 'SUCCESSFUL', data: matches };
  }

  async getFiltredMatches(query: string): Promise<ServiceResponse<Matches[]>> {
    const matchsFiltred = await this.matchModel.findFilteredMatches(query);

    return { status: 'SUCCESSFUL', data: matchsFiltred };
  }

  async finishMatch(id: number): Promise<ServiceResponse<FinishMessage>> {
    this.matchModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateMatch(homeGoals: number, awayGoals: number): Promise<ServiceResponse<UpdateMessage>> {
    await this.matchModel.updateMatch(homeGoals, awayGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }
}
