import { Matches } from '../Interfaces/MatchesType';
import { IMatchModel } from '../Interfaces/MatchModel';
import SequelizeMatch from '../database/models/MatchesModel';
import SequelizeTeam from '../database/models/TeamsModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<Matches[]> {
    const teams = await this.model.findAll({
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });

    return teams;
  }

  async findFilteredMatches(query: string): Promise<Matches[]> {
    const progress = JSON.parse(query);

    const teams = await this.model.findAll({
      where: { inProgress: progress },
      include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
      attributes: { exclude: ['home_team_id', 'away_team_id'] },
    });

    return teams;
  }
}
