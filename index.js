import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import feedbackRouter from './routes/feedback.js';
import uploadBackgroundRoute from './routes/uploadBackground.js';

// Чтобы корректно получить __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json()); // чтобы парсить JSON в теле запросов

app.use('/api', feedbackRouter);
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

uploadBackgroundRoute(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
