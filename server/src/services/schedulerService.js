import Post from '../models/Post.js';

export const getScheduledPostsDueNow = async () => {
  const now = new Date();

  return Post.find({
    status: 'scheduled',
    scheduledAt: { $lte: now },
  });
};

export const markPostAsPublished = async (postId, xPostId = '') => {
  await Post.findByIdAndUpdate(postId, {
    status: 'published',
    approvalStatus: 'approved',
    xPostId,
  });
};

export const markPostAsFailed = async (postId, reason = 'Publishing failed') => {
  await Post.findByIdAndUpdate(postId, {
    status: 'failed',
    notes: reason,
  });
};
