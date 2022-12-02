import { argv } from 'node:process';
import { parse } from 'node:path';
import { readFileSync } from 'node:fs';

const currentName = parse(argv[1]).name;
const inputFile = `./data/${currentName}input.txt`;

const input = readFileSync(inputFile).toString().split('\n');

// Implementations per day differ from here:
const chosen = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'lose',
  Y: 'draw',
  Z: 'win',
};

const myChoiceBasedOnOpponent = {
  rock: {
    lose: 'scissors',
    draw: 'rock',
    win: 'paper',
  },
  paper: {
    lose: 'rock',
    draw: 'paper',
    win: 'scissors',
  },
  scissors: {
    lose: 'paper',
    draw: 'scissors',
    win: 'rock',
  },
};

const pointsChosen = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const winningPoints = (me, opponent) => {
  if (me === opponent) {
    return 3;
  }

  if (me === 'rock' && opponent === 'scissors') {
    return 6;
  }
  if (me === 'paper' && opponent === 'rock') {
    return 6;
  }
  if (me === 'scissors' && opponent === 'paper') {
    return 6;
  }

  return 0;
};

const result = input.reduce((totalScore, currentLine) => {
  if (currentLine === '') {
    return totalScore;
  }

  const [opponent, desiredResult] = currentLine
    .split(' ')
    .map((s) => chosen[s]);
  const me = myChoiceBasedOnOpponent[opponent][desiredResult];

  let additionalScore = pointsChosen[me];
  additionalScore += winningPoints(me, opponent);

  return totalScore + additionalScore;
}, 0);

console.log(result);
