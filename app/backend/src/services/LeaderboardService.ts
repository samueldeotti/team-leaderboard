import { Matches } from '../Interfaces/Match/MatchesType';
import { Team } from '../Interfaces/Team/teamsType';
import { getAllInfo } from '../utils/leaderboardUtils';
import TeamModel from '../models/TeamModel';
import MatchesModel from '../models/MatchModel';
import { ILeaderBoard } from '../Interfaces/LeaderBoard/LeaderBoardType';
import { ServiceResponse } from '../types/ServiceResponse';

export default class LeaderboardService {
  constructor(
    private teamModel = new TeamModel(),
    private matchesModel = new MatchesModel(),
  ) { }

  static orderLeaderboard(teams: ILeaderBoard[]): ILeaderBoard[] {
    return teams.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      return b.goalsFavor - a.goalsFavor;
    });
  }

  static getInfo(matches: Matches[], teams: Team[], path: string): ILeaderBoard[] {
    const [...allTeams] = teams.map((team) => {
      let pathMatches = matches;
      if (path === 'home') pathMatches = matches.filter((match) => match.homeTeamId === team.id);
      if (path === 'away') pathMatches = matches.filter((match) => match.awayTeamId === team.id);
      return {
        name: team.teamName,
        ...getAllInfo(pathMatches, team.id),
      };
    });

    const orderedLeaderboard = LeaderboardService.orderLeaderboard(allTeams);

    return orderedLeaderboard;
  }

  public async getLeaderboard(path: string): Promise<ServiceResponse<ILeaderBoard[]>> {
    const teams = await this.teamModel.findAll();
    const matchesFilter = await this.matchesModel.findFilteredMatches('false');

    const allTeams = LeaderboardService.getInfo(matchesFilter, teams, path);

    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
