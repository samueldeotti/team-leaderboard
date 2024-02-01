import {
  allGames,
  totalWins,
  totalTies,
  totalLosts,
  totalPoints,
  goalsMade,
  goalsTaken,
  getAllInfo,
} from '../utils/leaderboardUtils';

import TeamModel from '../models/TeamModel';
import MatchesModel from '../models/MatchModel';
import { ILeaderBoard } from '../Interfaces/LeaderBoardType';
import { ServiceResponse } from '../types/ServiceResponse';

export default class LeaderboardService {
  constructor(
    private teamModel = new TeamModel(),
    private matchesModel = new MatchesModel(),
  ) { }

  public async getLeaderboard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const teams = await this.teamModel.findAll();
    const matchesFilter = await this.matchesModel.findFilteredMatches('false');

    const allTeams = teams.map((team) => ({
      name: team.teamName,
      ...getAllInfo(matchesFilter, team.id),
    }));

    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
