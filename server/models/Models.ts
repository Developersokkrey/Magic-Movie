import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Models extends Model {
  public RecID!: string;
  public Name!: string;
  public ActorsProfile?: string;
  public Description?: string;
  public Role!: 'Actor' | 'Actress';
  public BirthYear!: number;
  public Nationality?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Models.init(
  {
    RecID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ActorsProfile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Role: {
      type: DataTypes.ENUM('Actor', 'Actress'),
      allowNull: false,
    },
    BirthYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Nationality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'model',
  }
);

export default Models;
