import express from 'express';
import {
  createPost,
  deletePost,
  generateAiPost,
  getPostById,
  getPosts,
  improveAiPost,
  updatePost,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/generate', generateAiPost);
router.post('/improve', improveAiPost);

export default router;
