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

// ⚠️ This is "clever" code. It's bad!
// I won't figure out how this works if I need to get back to it.

/**
 * Returns an array where each element is an array of three rucksacks.
 * Each rucksack is an array of its contained characters.
 *
 * Example:
 * [ // All groups.
 *   [['a', 'b'], ['a', 'c'], ['a', 'x']], // The first group.
 *   [ // The second group.
 *     ['J', 'i'], // First rucksack in the second group.
 *     ['J', 's'], // Second rucksack in the second group.
 *     ['J', 'q'],
 *   ],
 * ]
 */
const groupOfThree = (groups, rucksack, index) => {
  if (index % 3 === 0) {
    // New group:
    groups.push([]);
  }

  // Add each rucksack as array of elements:
  groups[groups.length - 1].push(rucksack.split(''));

  return groups;
};

const findCommonCharacter = (group) =>
  // Each group consists of three arrays of contained characters:
  group[0].find(
    (rucksackZeroElement) =>
      group[1].includes(rucksackZeroElement) &&
      group[2].includes(rucksackZeroElement),
  );

const isLowerCase = (charCode) => charCode > 96;

const characterToPriority = (character) => {
  const charCode = character.charCodeAt(0);

  if (isLowerCase(charCode)) {
    // Lowercase letters start at priority 1:
    return charCode - 96;
  }

  // Uppercase letters start at priority 27:
  return charCode - 65 + 27;
};

const sum = (aggregator, element) => aggregator + element;

const result = input
  .reduce(groupOfThree, [])
  .map(findCommonCharacter)
  .map(characterToPriority)
  .reduce(sum, 0);

console.log(result);
