// server.js или feedback.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

router.post('/feedback', async (req, res) => {
  try {
    const { name, contact, message } = req.body;

    const text = `
<b>${name}</b> написал отзыв!

Связаться: ${contact}

Отзыв: ${message}
    `.trim();

    const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML'
      })
    });

    const data = await telegramRes.json();

    if (!data.ok) throw new Error(data.description);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Ошибка отправки в Telegram:', err.message);
    res.status(500).json({ error: 'Не удалось отправить сообщение' });
  }
});

export default router;
