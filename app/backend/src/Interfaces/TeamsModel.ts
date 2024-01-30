import { Team } from './teamsType';

export interface ITeamModel {
  findAll(): Promise<Team[]>
  findById(id: Team['id']): Promise<Team | null>
}
