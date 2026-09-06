const TelegramBot = require('node-telegram-bot-api');

const token = '8877905784:AAHYJm_i5gSG-Twj3PmMw_HENu79Rr6ITVM'; 
const bot = new TelegramBot(token, { polling: true });

bot.on('channel_post', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text && text.includes('soundcloud.com')) {
    try {
      const audioUrl = `https://scdlbot.com{encodeURIComponent(text)}`;

      await bot.sendAudio(chatId, audioUrl, {
        title: 'SoundCloud Track',
        performer: 'My Music Bot'
      });

      await bot.deleteMessage(chatId, msg.message_id);

    } catch (error) {
      console.log('Помилка завантаження:', error.message);
    }
  }
});

console.log('Бот успішно запущений на сервері!');
