const TelegramBot = require('node-telegram-bot-api');
const scdl = require('soundcloud-downloader').default;
const http = require('http');

const token = '8877905784:AAHYJm_i5gSG-Twj3PmMw_HENu79Rr6ITVM'; 
const bot = new TelegramBot(token, { polling: true });

// Фейковий сервер для Render
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running\n');
}).listen(process.env.PORT || 10000, '0.0.0.0');

bot.on('channel_post', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text && text.includes('soundcloud.com')) {
    try {
      const cleanUrl = text.replace(/\s+/g, '').trim();

      // Магія: качаємо трек НАПРЯМУ у внутрішню пам'ять сервера, без сайтів!
      const stream = await scdl.download(cleanUrl);

      // Відправляємо чистий MP3 файл у канал
      await bot.sendAudio(chatId, stream, {
        title: 'SoundCloud Track',
        performer: 'My Music Bot'
      }, {
        filename: 'track.mp3',
        contentType: 'audio/mpeg'
      });

      // Видаляємо сире посилання
      await bot.deleteMessage(chatId, msg.message_id);

    } catch (error) {
      console.log('Помилка завантаження:', error.message);
    }
  }
});

console.log('Бот успішно запущений з локальним завантажувачем!');
