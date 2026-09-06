const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

const token = '8877905784:AAHYJm_i5gSG-Twj3PmMw_HENu79Rr6ITVM'; 
const bot = new TelegramBot(token, { polling: true });

// Створюємо простий сервер, щоб Render не ламався і не шукав порти
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running\n');
}).listen(process.env.PORT || 10000, '0.0.0.0');

bot.on('channel_post', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text && text.includes('soundcloud.com')) {
    try {
      // Очищаємо посилання від зайвих пробілів та символів, щоб Telegram не ламався
      const cleanUrl = text.trim();
      const audioUrl = `https://scdlbot.com{encodeURIComponent(cleanUrl)}`;

      // Надсилаємо чистий MP3-файл у твій канал
      await bot.sendAudio(chatId, audioUrl, {
        title: 'SoundCloud Track',
        performer: 'My Music Bot'
      });

      // Миттєво видаляємо сире посилання з каналу, щоб було чисто
      await bot.deleteMessage(chatId, msg.message_id);

    } catch (error) {
      console.log('Помилка завантаження:', error.message);
    }
  }
});

console.log('Бот успішно запущений!');
