import { argv } from 'node:process';
import { parse } from 'node:path';
import { readFileSync } from 'node:fs';

const currentName = parse(argv[1]).name;
const inputFile = `./data/${currentName}input.txt`;

const input = readFileSync(inputFile)
  .toString()
  .split('\n')
  .filter((line) => line !== '');

// Implementations per day differ from here:
const splitInHalf = (element) => {
  const characters = element.split('');

  return {
    left: characters.slice(0, characters.length / 2),
    right: characters.slice(-(characters.length / 2)),
  };
};

const findCommonCharacter = (element) =>
  element.left.find((left) => element.right.includes(left));

const isLowerCase = (charCode) => charCode > 96;

const characterToPriority = (element) => {
  const charCode = element.charCodeAt(0);

  if (isLowerCase(charCode)) {
    // Lowercase letters start at priority 1:
    return charCode - 96;
  }

  // Uppercase letters start at priority 27:
  return charCode - 65 + 27;
};

const sum = (aggregator, element) => aggregator + element;

const result = input
  .map(splitInHalf)
  .map(findCommonCharacter)
  .map(characterToPriority)
  .reduce(sum, 0);

console.log(result);
