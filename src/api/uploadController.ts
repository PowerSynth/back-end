import { Request, Response } from 'express';

export const uploadFiles = (req: Request, res: Response) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }
  res.status(200).json({ message: 'Files uploaded successfully', files: req.files });
};
