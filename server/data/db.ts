import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Function to connect to the database
export const connectDB = async () => {
  return open({
    // filename: './server/data/database_default.db', // Path to your SQLite database file
    filename: './server/data/database.db', // Path to your SQLite database file
    driver: sqlite3.Database, // Use the SQLite3 driver
  });
};

