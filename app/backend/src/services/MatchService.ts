import { ServiceResponse } from '../types/ServiceResponse';
import { MatchParams, Matches } from '../Interfaces/Match/MatchesType';
import MatchModel from '../models/MatchModel';
import TeamService from './TeamService';

type FinishMessage = { message: 'Finished'; };
type UpdateMessage = { message: 'Updated'; };

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
    private teamService = new TeamService(),
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

  async updateMatch(
    homeGoals: number,
    awayGoals: number,
    id:number,
  ): Promise<ServiceResponse<UpdateMessage>> {
    await this.matchModel.updateMatch(homeGoals, awayGoals, id);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  async createMatch(matchParams: MatchParams): Promise<ServiceResponse<Matches>> {
    const { homeTeamId, awayTeamId } = matchParams;

    if (homeTeamId === awayTeamId) {
      return { status: 'INVALID',
        data:
      { message: 'It is not possible to create a match with two equal teams' } };
    }

    const homeExists = await this.teamService.getTeamById(Number(homeTeamId));
    const awayExists = await this.teamService.getTeamById(Number(awayTeamId));

    if (homeExists.status === 'NOT_FOUND' || awayExists.status === 'NOT_FOUND') {
      return { status: 'NOT_FOUND',
        data:
      { message: 'There is no team with such id!' } };
    }

    const match = await this.matchModel.createMatch(matchParams);

    return { status: 'CREATED', data: match };
  }
}
