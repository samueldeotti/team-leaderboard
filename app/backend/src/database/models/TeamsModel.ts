import { DataTypes, Model, ModelDefined, Optional } from 'sequelize';
import db from './index';
import { Team } from '../../types/Team';

type TeamInputtableTypes = Optional<Team, 'id'>;
type TeamSequelizeModelCreator = ModelDefined<Team, TeamInputtableTypes>;
export type OrderSequelizeModel = Model<Team, TeamInputtableTypes>;

const TeamsModel: TeamSequelizeModelCreator = db.define('Team', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

export default TeamsModel;
