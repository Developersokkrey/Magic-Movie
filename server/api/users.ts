import { connectDB } from '../data/db'; // Import the `connectDB` function

export default defineEventHandler(async () => {
  try {
    const db = await connectDB(); // Ensure `connectDB` is correctly implemented
    const users = await db.all('SELECT * FROM users'); // Example query
    return users;
  } catch (error) {
    console.error('Error in /api/users:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  }
});
