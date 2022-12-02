import { argv } from 'node:process';
import { parse } from 'node:path';
import { readFileSync } from 'node:fs';

const currentName = parse(argv[1]).name;
const inputFile = `./data/${currentName}input.txt`;

const input = readFileSync(inputFile).toString().split('\n');

// Implementations per day differ from here:
const result = input
  .reduce(
    (elfCalories, currentCalories) => {
      if (currentCalories === '') {
        // Next elf.
        elfCalories.push(0);
        return elfCalories;
      }

      const currentCaloriesNumber = Number.parseInt(currentCalories, 10);
      /* eslint-disable-next-line no-param-reassign */
      elfCalories[elfCalories.length - 1] += currentCaloriesNumber;

      return elfCalories;
    },
    [0],
  )
  .sort((a, b) => a - b)
  .slice(-3)
  .reduce((sum, current) => sum + current, 0);

console.log(result);
