import { Router } from 'express';
import { uploadFile, uploadMiddleware } from '../controllers/uploadController';

export const uploadRoutes = Router();

uploadRoutes.post('/', uploadMiddleware, uploadFile);
