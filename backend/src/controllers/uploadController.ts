import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

export const uploadFile = async (req: Request, res: Response) => {
    if (req.file) {
        const imageUrl = `/uploads/${req.file.filename}`;
        res.status(201).json({ url: imageUrl });
    } else {
        res.status(400)
    }
};

export const uploadMiddleware = upload.single('file');
