import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Path to SQLite database file
  // streage : './server/data/database.db'
  logging: console.log, // Optional: Set to `false` to disable logging
});

export default sequelize;
// import { Sequelize } from 'sequelize';
// import path from 'path';

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: path.resolve(__dirname, 'database.db'), // Path to SQLite database file at root/server/database.db
//   logging: console.log, // Optional: Set to `false` to disable logging
// });

// export default sequelize;

