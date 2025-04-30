import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Movie extends Model {
  public RecID!: string;
  public Code!: string;
  public Title!: string;
  public Description?: string;
  public MovieProfile?: string;
  public Years!: number;
  public Duration!: number;
  public ActorsRecID?: string;
  public StudioRecID?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Movie.init(
  {
    RecID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    Code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    MovieProfile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Years: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ActorsRecID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    StudioRecID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'movie',
  }
);

export default Movie;
