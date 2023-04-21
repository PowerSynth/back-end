import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = `uploads/${req.body.folder}`;
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
