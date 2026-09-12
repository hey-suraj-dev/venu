import Post from '../models/Post.js';
import { generatePostFromTopic, improvePost } from '../services/geminiService.js';

export const createPost = async (req, res) => {
  try {
    const { title, content, status, tone, language, scheduledAt, notes } = req.body;

    const post = await Post.create({
      userId: req.user._id,
      title: title || '',
      content: content || '',
      status: status || 'draft',
      tone: tone || 'professional',
      language: language || 'en',
      scheduledAt: scheduledAt || null,
      notes: notes || '',
    });

    return res.status(201).json({ post });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to create post' });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = { userId: req.user._id };

    if (status) query.status = status;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const posts = await Post.find(query).sort({ createdAt: -1 });

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to fetch posts' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, userId: req.user._id });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to fetch post' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, userId: req.user._id });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const { title, content, status, tone, language, scheduledAt, notes, approvalStatus } = req.body;

    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (status !== undefined) post.status = status;
    if (tone !== undefined) post.tone = tone;
    if (language !== undefined) post.language = language;
    if (scheduledAt !== undefined) post.scheduledAt = scheduledAt;
    if (notes !== undefined) post.notes = notes;
    if (approvalStatus !== undefined) post.approvalStatus = approvalStatus;

    await post.save();

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to update post' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to delete post' });
  }
};

export const generateAiPost = async (req, res) => {
  try {
    const { topic, tone, language } = req.body;

    if (!topic) {
      return res.status(400).json({ message: 'Topic is required' });
    }

    const result = await generatePostFromTopic({ topic, tone, language });

    return res.status(200).json({ content: result });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to generate post' });
  }
};

export const improveAiPost = async (req, res) => {
  try {
    const { content, tone, language } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const result = await improvePost({ content, tone, language });

    return res.status(200).json({ content: result });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to improve post' });
  }
};
