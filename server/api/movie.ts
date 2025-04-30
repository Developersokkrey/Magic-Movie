import { defineEventHandler, getQuery, readBody } from 'h3';
import Movie from '../models/Movie';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    const query = getQuery(event);

    // Fetch a single movie by RecID
    if (query.RecID) {
      try {
        const movie = await Movie.findOne({ where: { RecID: query.RecID } });
        if (!movie) {
          return { success: false, message: 'Movie not found.' };
        }
        return { success: true, data: movie };
      } catch (error) {
        return { success: false, message: 'Failed to fetch movie.', error };
      }
    }

    // Fetch all movies
    try {
      const movies = await Movie.findAll();
      return { success: true, data: movies };
    } catch (error) {
      return { success: false, message: 'Failed to fetch movies.', error };
    }
  }

  if (method === 'POST') {
    // Create a new movie
    const body = await readBody(event);

    try {
      const newMovie = await Movie.create(body);
      return { success: true, message: 'Movie added successfully.', data: newMovie };
    } catch (error) {
      return { success: false, message: 'Failed to add movie.', error };
    }
  }

  if (method === 'PUT') {
    const query = getQuery(event);

    // Update an existing movie by RecID
    if (!query.RecID) {
      return { success: false, message: 'RecID is required to update a movie.' };
    }

    const body = await readBody(event);

    try {
      const movie = await Movie.findOne({ where: { RecID: query.RecID } });
      if (!movie) {
        return { success: false, message: 'Movie not found.' };
      }

      await movie.update(body);
      return { success: true, message: 'Movie updated successfully.', data: movie };
    } catch (error) {
      return { success: false, message: 'Failed to update movie.', error };
    }
  }

  // Handle unsupported HTTP methods
  return {
    success: false,
    message: 'Method not supported.',
  };
});
