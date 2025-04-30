import { defineEventHandler, getQuery, readBody } from 'h3';
import Image from '../models/Image';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    const query = getQuery(event);

    // Fetch a single image by RecID
    if (query.RecID) {
      try {
        const image = await Image.findOne({ where: { RecID: query.RecID } });
        if (!image) {
          return { success: false, message: 'Image not found.' };
        }
        return { success: true, data: image };
      } catch (error) {
        return { success: false, message: 'Failed to fetch image.', error };
      }
    }

    // Fetch all image
    try {
      const image = await Image.findAll();
      return { success: true, data: image };
    } catch (error) {
      return { success: false, message: 'Failed to fetch image.', error };
    }
  }

  if (method === 'POST') {
    // Create a new image
    const body = await readBody(event);

    try {
      const newImage = await Image.create(body);
      return { success: true, message: 'Image added successfully.', data: newImage };
    } catch (error) {
      return { success: false, message: 'Failed to add image.', error };
    }
  }

  if (method === 'PUT') {
    const query = getQuery(event);

    // Update an existing image by RecID
    if (!query.RecID) {
      return { success: false, message: 'RecID is required to update a image.' };
    }

    const body = await readBody(event);

    try {
      const image = await Image.findOne({ where: { RecID: query.RecID } });
      if (!image) {
        return { success: false, message: 'Image not found.' };
      }

      await image.update(body);
      return { success: true, message: 'Image updated successfully.', data: image };
    } catch (error) {
      return { success: false, message: 'Failed to update iamge.', error };
    }
  }

  // Handle unsupported HTTP methods
  return {
    success: false,
    message: 'Method not supported.',
  };
});
