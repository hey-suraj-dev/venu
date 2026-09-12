import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      trim: true,
      default: '',
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'publishing', 'published', 'failed'],
      default: 'draft',
      index: true,
    },
    tone: {
      type: String,
      enum: ['professional', 'casual', 'educational', 'promotional'],
      default: 'professional',
    },
    language: {
      type: String,
      default: 'en',
    },
    scheduledAt: {
      type: Date,
      default: null,
    },
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    xPostId: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

postSchema.index({ userId: 1, status: 1, scheduledAt: 1 });

const Post = mongoose.model('Post', postSchema);

export default Post;
