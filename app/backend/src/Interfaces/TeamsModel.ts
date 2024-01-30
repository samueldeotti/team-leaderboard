import { Team } from './teamsType';

export interface ITeamModel {
  findAll(): Promise<Team[]>
}
