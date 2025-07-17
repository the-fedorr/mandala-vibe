import { calculateFinanceSequence, reflectString, reduceArrayNeighbors } from '../utils/index.js';

function processFinance(date, bot, msg) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = msg.text;

  const baseSequence = calculateFinanceSequence(date);
  const pyramideSide = [...reflectString(baseSequence), ...reflectString(baseSequence)];

  const pyramide = [
    [pyramideSide[0]], 
    [pyramideSide[1], pyramideSide[1]]
  ];
  for (let i = 2; i < pyramideSide.length; i++) {
    const sideNumber = pyramideSide[i];
    const newRow = [sideNumber, ...reduceArrayNeighbors(pyramide[i - 1]), sideNumber];
    pyramide.push(newRow);
  }

  const formattedPyramide = pyramide.map((row, index) => {
    for (let i = 15 - index; i > 0; i--) {
      row.unshift('\u00A0');
    }
    return row.join('\u00A0');
  }).join('\n');

  bot.sendMessage(chatId, formattedPyramide);
}


export { processFinance };
