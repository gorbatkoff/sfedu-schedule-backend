// index.js
import express from 'express';
import feedbackRouter from './feedback.js';

const app = express();

app.use(express.json()); // чтобы парсить JSON в теле запросов

app.use('/api', feedbackRouter);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
