const { log } = require('console');
const { reflectString, calculateNeighborsMatrix } = require('../utils');

function processBirthday(date, bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text;

  const reflectedData = reflectString(date);
  const matrix = calculateNeighborsMatrix(reflectedData);

  const formattedMatrix = matrix.map((row, index) => {
    for (let i = 0; i < index; i++) {
      row.unshift('\u00A0');
    }
    return row.join('\u00A0');
  }).join('\n');

  console.log(formattedMatrix);

  bot.sendMessage(chatId, formattedMatrix);
}


module.exports = {
  processBirthday,
};
