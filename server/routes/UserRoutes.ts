import express from 'express';
import { getThumbnailbyId, getUsersThumbnails } from '../controllers/UserControllers.js';
import protect from '../middlewares/auth.js';

const UserRouter = express.Router();

UserRouter.get('/thubnails', protect, getUsersThumbnails)
UserRouter.get('/thubnails/:id', protect, getThumbnailbyId)

export default UserRouter;