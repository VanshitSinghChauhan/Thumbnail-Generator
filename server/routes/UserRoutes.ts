import express from 'express';
import { getThumbnailbyId, getUsersThumbnails } from '../controllers/UserControllers.js';

const UserRouter = express.Router();

UserRouter.get('/thubnails', getUsersThumbnails)
UserRouter.get('/thubnails/:id', getThumbnailbyId)

export default UserRouter;