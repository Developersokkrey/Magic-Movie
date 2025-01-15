import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Studio extends Model {
  public RecID!: string;
  public Name!: string;
  public StudioProfile?: string;
  public Description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Studio.init(
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
    StudioProfile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'studio',
  }
);

export default Studio;
