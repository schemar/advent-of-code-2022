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
  X: 'rock',
  Y: 'paper',
  Z: 'scissors',
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

  const [opponent, me] = currentLine.split(' ').map((s) => chosen[s]);
  let additionalScore = pointsChosen[me];
  additionalScore += winningPoints(me, opponent);

  return totalScore + additionalScore;
}, 0);

console.log(result);
