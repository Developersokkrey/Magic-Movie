import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class SocialMedia extends Model {
  public RecID!: string;
  public Name!: string;
  public SociaMediaProfile?: string;
  public Address?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SocialMedia.init(
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
    SociaMediaProfile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Address: {
      type: DataTypes.STRING, // Using STRING for URL
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'social_media',
  }
);

export default SocialMedia;
