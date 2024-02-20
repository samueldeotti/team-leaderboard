import { ITeamModel } from '../Interfaces/Team/TeamsModel';
import { Team } from '../Interfaces/Team/teamsType';
import SequelizeTeam from '../database/models/TeamsModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<Team[]> {
    const allTeams = await this.model.findAll();

    return allTeams;
  }

  async findById(id: number): Promise<Team | null> {
    const team = await this.model.findByPk(id);
    if (team == null) return null;

    return team;
  }
}
