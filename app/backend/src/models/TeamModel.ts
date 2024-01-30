import { ITeamModel } from '../Interfaces/TeamsModel';
import { Team } from '../Interfaces/teamsType';
import SequelizeBook from '../database/models/TeamsModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeBook;

  async findAll(): Promise<Team[]> {
    const allTeams = await this.model.findAll();

    return allTeams;
  }
}
