export function processDate(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text;

  console.log(text);

  const [day, month, year] = text.split('.');
  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) {
    bot.sendMessage(chatId, 'Некоректна дата. Спробуйте ще раз.');
    bot.sendMessage(chatId, 'Введіть дату народження в форматі DD.MM.YYYY:');
    return null;
  }

  bot.sendMessage(chatId, `Розрахунок для "${day}.${month}.${year}"`);
  return [day, month, year];
}


