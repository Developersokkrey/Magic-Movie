import { defineEventHandler, getQuery, readBody } from 'h3';
import SocialMedia from '../models/SocialMedia';

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    const query = getQuery(event);

    // Fetch a single SocialMedia by RecID
    if (query.RecID) {
      try {
        const social_media = await SocialMedia.findOne({ where: { RecID: query.RecID } });
        if (!social_media) {
          return { success: false, message: 'SocialMedia not found.' };
        }
        return { success: true, data: social_media };
      } catch (error) {
        return { success: false, message: 'Failed to fetch social_media.', error };
      }
    }

    // Fetch all SocialMedia
    try {
      const social_media = await SocialMedia.findAll();
      return { success: true, data: social_media };
    } catch (error) {
      return { success: false, message: 'Failed to fetch social_media.', error };
    }
  }

  if (method === 'POST') {
    // Create a new socail media
    const body = await readBody(event);

    try {
      const newSocialMedia = await SocialMedia.create(body);
      return { success: true, message: 'SocialMedia added successfully.', data: newSocialMedia };
    } catch (error) {
      return { success: false, message: 'Failed to add social media.', error };
    }
  }

  if (method === 'PUT') {
    const query = getQuery(event);

    // Update an existing socia media by RecID
    if (!query.RecID) {
      return { success: false, message: 'RecID is required to update a social media.' };
    }

    const body = await readBody(event);

    try {
      const social_media = await SocialMedia.findOne({ where: { RecID: query.RecID } });
      if (!social_media) {
        return { success: false, message: 'SocialMedia not found.' };
      }

      await social_media.update(body);
      return { success: true, message: 'SocialMedia updated successfully.', data: social_media };
    } catch (error) {
      return { success: false, message: 'Failed to update social media.', error };
    }
  }

  // Handle unsupported HTTP methods
  return {
    success: false,
    message: 'Method not supported.',
  };
});
