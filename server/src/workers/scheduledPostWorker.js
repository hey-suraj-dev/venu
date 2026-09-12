import Post from '../models/Post.js';
import { getScheduledPostsDueNow, markPostAsFailed, markPostAsPublished } from '../services/schedulerService.js';

export const runScheduledPostWorker = async () => {
  try {
    const duePosts = await getScheduledPostsDueNow();

    for (const post of duePosts) {
      try {
        await Post.findByIdAndUpdate(post._id, { status: 'publishing' });

        // Placeholder for X API publish action in a later phase.
        // Replace this with real X publishing logic and safe retries.
        await markPostAsPublished(post._id, `mock-x-post-${post._id}`);
      } catch (error) {
        await markPostAsFailed(post._id, error.message || 'Scheduling worker failed');
      }
    }
  } catch (error) {
    console.error('Scheduled post worker error:', error.message);
  }
};
