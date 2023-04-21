import { Router } from 'express';
import upload from '../middleware/multerMiddleware';
import { uploadFiles } from '../api/uploadController';

export default (router: Router) => {
    router.post('/upload', upload.array('files'), uploadFiles);
}