import { MatchParams, Matches } from './MatchesType';

export type UpdateMessage = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

export interface IMatchModel {
  findAll(): Promise<Matches[]>
  findFilteredMatches(query: string): Promise<Matches[]>
  finishMatch(id: number): Promise<void>
  updateMatch(homeGoals: number, awayGoals: number, id: number): Promise<void>
  createMatch(matchParams: MatchParams): Promise<Matches>
}
