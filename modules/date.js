function processDate(bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text;

  const [day, month, year] = text.split('.');
  const date = new Date(year, month - 1, parseDay(day));

  if (isNaN(date.getTime())) {
    bot.sendMessage(chatId, 'Некоректна дата. Спробуйте ще раз.');
    bot.sendMessage(chatId, 'Введіть дату народження в форматі DD.MM.YYYY:');
    return null;
  }

  bot.sendMessage(chatId, `Введено дату: "${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}"`);
  return [...day, ...month, ...year];
}

function parseDay(day) {
  if (day.length === 1) {
    return `0${day}`;
  }
  return day;
}

module.exports = {
  processDate,
};
