import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Image extends Model {
  public RecID!: string;
  public Description?: string;
  public ImageURL!: string;
  public ActorsRecID!: string;
  public MovieRecID!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Image.init(
  {
    RecID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ImageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ActorsRecID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    MovieRecID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'images',
  }
);

export default Image;
