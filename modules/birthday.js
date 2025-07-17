import { reflectString, calculateNeighborsMatrix } from '../utils/index.js';

function processBirthday(date, bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text;

  const [day, month, year] = date;
  const reflectedData = reflectString([...day, ...month, ...year]);
  const matrix = calculateNeighborsMatrix(reflectedData);

  const formattedMatrix = matrix.map((row, index) => {
    for (let i = 0; i < index; i++) {
      row.unshift('\u00A0');
    }
    return row.join('\u00A0');
  }).join('\n');

  bot.sendMessage(chatId, formattedMatrix);
}


export { processBirthday };
