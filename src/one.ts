import readline from "readline";
import fs from "fs";
import path from "path";

const FILE_PATH = path.resolve("assets", "inputOne.txt");

function getList(): Promise<number[]> {
  return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(FILE_PATH),
    });

    const results: number[] = [];
    readInterface.on("line", (line) => {
      results.push(Number.parseInt(line, 10));
    });
    readInterface.on("close", () => {
      resolve(results);
    });
  });
}

export function getSumTo2020(values: number[]): [number, number] {
  const sorted = values.sort((a, b) => a - b);
  let first = 0;
  let last = sorted.length - 1;
  while (first < last) {
    if (sorted[first] + sorted[last] === 2020) {
      return [sorted[first], sorted[last]];
    } else if (sorted[first] + sorted[last] < 2020) {
      first++;
    } else {
      last--;
    }
  }
  return [0, 0]; // failure case
}

export function getMultipliedValue(values: number[], combos: number): number {
  if (combos === 2) {
    const nums = getSumTo2020(values);
    return nums[0] * nums[1];
  } else if (combos === 3) {
    const vals = getTripleTo2020(values);
    return vals[0] * vals[1] * vals[2];
  }
  return 0; // failure
}

export function getTripleTo2020(values: number[]): [number, number, number] {
  const sorted = values.sort((a, b) => a - b);
  for (let i = 0; i < sorted.length - 2; i++) {
    let first = i + 1;
    let last = sorted.length - 1;
    while (first < last) {
      if (sorted[first] + sorted[last] + sorted[i] === 2020) {
        return [sorted[first], sorted[last], sorted[i]];
      } else if (sorted[first] + sorted[last] + sorted[i] < 2020) {
        first++;
      } else {
        last--;
      }
    }
  }
  return [0, 0, 0]; // failure case
}

export async function runOne() {
  const inputs = await getList();
  console.log(`Part One: ${getMultipliedValue(inputs, 2)}`);
  console.log(`Part Two: ${getMultipliedValue(inputs, 3)}`);
}
