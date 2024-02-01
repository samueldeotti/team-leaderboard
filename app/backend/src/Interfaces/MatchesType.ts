export interface Matches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export type MatchParams = {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
};
