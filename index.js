const express = require('express');
const app = express();
const PORT = 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Простейшая ручка
app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
