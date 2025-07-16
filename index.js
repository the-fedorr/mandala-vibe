import TelegramBot from 'node-telegram-bot-api';
import { processBirthday } from './modules/birthday.js';
import { processDate } from './modules/date.js';

const token = process.env.TG_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const locations = {
  home: '🏠 Додому',
};

const userStates = {};

const persistentKeyboard = {
  reply_markup: {
    keyboard: [
      [locations.home]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

const inlineButtons = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '📝 Мандала по даті народження', callback_data: 'birthday' }],
      [{ text: '💰 Фінансовий код', callback_data: 'finance_code' }]
    ]
  }
};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Вітаємо в боті!', persistentKeyboard);
  bot.sendMessage(chatId, 'Оберіть мандалу:', inlineButtons);
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;

  bot.sendMessage(chatId, 'Введіть дату народження в форматі DD.MM.YYYY:');
  if (query.data === 'birthday') {
    userStates[userId] = 'awaiting_birthday';
  } else if (query.data === 'finance_code') {
    userStates[userId] = 'awaiting_finance';
  }

  bot.answerCallbackQuery(query.id);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text;

  if (text === locations.home) {
    userStates[userId] = null;
    bot.sendMessage(chatId, 'Оберіть мандалу:', inlineButtons);
    return;
  }

  const state = userStates[userId];
  if (state === 'awaiting_birthday') {
    const date = processDate(bot, msg);
    if (!date) {
      return null;
    }
    processBirthday(date, bot, msg);
    userStates[userId] = null;
  } else if (state === 'awaiting_finance') {
    bot.sendMessage(chatId, `Розрахунок фінансового коду буде доступний тріііііііішечки пізніше.`);
    userStates[userId] = null;
  }
  
});

console.log('INDEX is up and running...');