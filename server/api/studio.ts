import { defineEventHandler, getQuery, readBody } from 'h3';
import Studio from '../models/Studio';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    const query = getQuery(event);

    // Fetch a single studio by RecID
    if (query.RecID) {
      try {
        const studio = await Studio.findOne({ where: { RecID: query.RecID } });
        if (!studio) {
          return { success: false, message: 'Movie not found.' };
        }
        return { success: true, data: studio };
      } catch (error) {
        return { success: false, message: 'Failed to fetch movie.', error };
      }
    }

    // Fetch all studio
    try {
      const studio = await Studio.findAll();
      return { success: true, data: studio };
    } catch (error) {
      return { success: false, message: 'Failed to fetch studio.', error };
    }
  }

  if (method === 'POST') {
    // Create a new movie
    const body = await readBody(event);

    try {
      const newStudio = await Studio.create(body);
      return { success: true, message: 'Studio added successfully.', data: newStudio };
    } catch (error) {
      return { success: false, message: 'Failed to add studio.', error };
    }
  }

  if (method === 'PUT') {
    const query = getQuery(event);

    // Update an existing movie by RecID
    if (!query.RecID) {
      return { success: false, message: 'RecID is required to update a studio.' };
    }

    const body = await readBody(event);

    try {
      const movie = await Studio.findOne({ where: { RecID: query.RecID } });
      if (!movie) {
        return { success: false, message: 'Studio not found.' };
      }

      await movie.update(body);
      return { success: true, message: 'Studio updated successfully.', data: movie };
    } catch (error) {
      return { success: false, message: 'Failed to update studio.', error };
    }
  }

  // Handle unsupported HTTP methods
  return {
    success: false,
    message: 'Method not supported.',
  };
});
