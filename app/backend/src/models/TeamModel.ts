import { ITeamModel } from '../Interfaces/TeamsModel';
import { Team } from '../Interfaces/teamsType';
import SequelizeBook from '../database/models/TeamsModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeBook;

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
