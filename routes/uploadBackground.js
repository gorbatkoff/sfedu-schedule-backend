import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadPath = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadPath);
  },
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png'];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error('Только .jpg и .png файлы разрешены'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

export default function uploadBackgroundRoute(app) {
  app.post('/upload-background', (req, res) => {
    upload.single('background')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Ошибка multer (например, лимит размера)
        return res.status(400).json({ error: err.message });
      } else if (err) {
        // Другая ошибка
        return res.status(400).json({ error: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'Файл не загружен' });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({ message: 'Фон загружен', url: fileUrl });
    });
  });
}
