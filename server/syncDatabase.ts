import sequelize from './sequelize';
import User from './models/User';

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully.');

    await sequelize.sync({ force: true }); // Use `force: true` to drop and recreate tables
    console.log('Database synchronized.');
    
    // Optional: Seed example data
    await User.create({ name: 'John Doe', email: 'john@example.com' });
    console.log('Example user created.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
