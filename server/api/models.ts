import { defineEventHandler, getQuery, readBody, sendError, createError } from 'h3';
import Models from '../models/Models'; // Ensure correct path

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  try {
    if (method === 'GET') {
      const query = getQuery(event);

      if (query.RecID) {
        const actor = await Models.findOne({ where: { RecID: query.RecID } });
        if (!actor) {
          return sendError(event, createError({ statusCode: 404, statusMessage: "Actor not found" }));
        }
        return { success: true, data: actor };
      }

      const actors = await Models.findAll();
      return { success: true, data: actors };
    }

    if (method === 'POST') {
      const body = await readBody(event);
      if (!body.Name || !body.Role || !body.BirthYear) {
        return sendError(event, createError({ statusCode: 400, statusMessage: "Missing required fields" }));
      }

      const newActor = await Models.create(body);
      return { success: true, data: newActor };
    }

    if (method === 'PUT') {
      const body = await readBody(event);
      if (!body.RecID) {
        return sendError(event, createError({ statusCode: 400, statusMessage: "RecID is required" }));
      }

      const actor = await Models.findOne({ where: { RecID: body.RecID } });
      if (!actor) {
        return sendError(event, createError({ statusCode: 404, statusMessage: "Actor not found" }));
      }

      await actor.update(body);
      return { success: true, data: actor };
    }

    return sendError(event, createError({ statusCode: 405, statusMessage: "Method not supported" }));

  } catch (error) {
    console.error('Server Error:', error);
    return sendError(event, createError({ statusCode: 500, statusMessage: "Internal Server Error" }));
  }
});
