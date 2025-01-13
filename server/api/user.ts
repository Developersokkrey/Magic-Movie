import { defineEventHandler } from 'h3';
import User from '../models/User';

export default defineEventHandler(async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: 'An unknown error occurred' };
    }
  }
});
