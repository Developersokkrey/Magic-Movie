import { defineEventHandler, getQuery, readBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  // Handle GET requests
  if (method === 'GET') {
    const query = getQuery(event);

    // Fetch a single movie by RecID
    if (query.RecID) {
      try {
        const movie = await prisma.movie.findUnique({
          where: { RecID: query.RecID as string },
        });

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
      const movies = await prisma.movie.findMany();
      return { success: true, data: movies };
    } catch (error) {
      return { success: false, message: 'Failed to fetch movies.', error };
    }
  }

  // Handle POST requests
  if (method === 'POST') {
    const body = await readBody(event);

    try {
      const newMovie = await prisma.movie.create({
        data: body,
      });
      return { success: true, message: 'Movie added successfully.', data: newMovie };
    } catch (error) {
      return { success: false, message: 'Failed to add movie.', error };
    }
  }

  // Handle PUT requests (update movie)
  if (method === 'PUT') {
    const query = getQuery(event);

    if (!query.RecID) {
      return { success: false, message: 'RecID is required to update a movie.' };
    }

    const body = await readBody(event);

    try {
      const movie = await prisma.movie.findUnique({
        where: { RecID: query.RecID as string },
      });

      if (!movie) {
        return { success: false, message: 'Movie not found.' };
      }

      const updatedMovie = await prisma.movie.update({
        where: { RecID: query.RecID as string },
        data: body,
      });

      return { success: true, message: 'Movie updated successfully.', data: updatedMovie };
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
