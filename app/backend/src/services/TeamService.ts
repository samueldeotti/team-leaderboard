import { ServiceResponse } from '../types/ServiceResponse';
import { Team } from '../Interfaces/teamsType';
import { ITeamModel } from '../Interfaces/TeamsModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<Team[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
