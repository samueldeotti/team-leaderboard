import { Matches } from './MatchesType';

export interface IMatchModel {
  findAll(): Promise<Matches[]>
}
