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

  async finishMatch(id: number): Promise<void> {
    try {
      await this.model.update({ inProgress: false }, { where: { id } });
    } catch (error) {
      throw new Error('Not possible to finish the match.');
    }
  }

  async updateMatch(homeGoals: number, awayGoals: number): Promise<void> {
    try {
      await this.model.update(
        { homeTeamGoals: homeGoals, awayTeamGoals: awayGoals },
        { where: { inProgress: true } },
      );
    } catch (error) {
      throw new Error('Not possible to update the match.');
    }
  }
}
