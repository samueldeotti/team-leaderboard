import { ServiceResponse } from '../types/ServiceResponse';
import { Matches } from '../Interfaces/MatchesType';
import MatchModel from '../models/MatchModel';

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
}
