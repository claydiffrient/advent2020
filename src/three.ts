import readline from "readline";
import fs from "fs";
import path from "path";

const FILE_PATH = path.resolve("assets", "inputThree.txt");

function getList(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(FILE_PATH),
    });

    const results: string[] = [];
    readInterface.on("line", (line) => {
      results.push(line);
    });
    readInterface.on("close", () => {
      resolve(results);
    });
  });
}

export function convertMap(skiMap: string[]): boolean[][] {
  const result: boolean[][] = [];
  return skiMap.map((line) => {
    return line.split("").map((char) => {
      return char === "#";
    });
  });
}

export function calculateTotalWidth(
  skiMap: boolean[][],
  right: number,
  down: number
): number {
  let neededWidth = 0;
  const skiMapHeight = skiMap.length;
  for (let i = 0; i < skiMapHeight; i = i + down) {
    neededWidth += right;
  }
  return neededWidth;
}

export function widenMap(skiMap: boolean[][], neededWidth: number) {
  const skiMapWidth = skiMap[0].length;
  const numToMultiply = neededWidth / skiMapWidth;
  return skiMap.map((row) => {
    let newRow = row;
    for (let i = 0; i < numToMultiply - 1; i++) {
      newRow = newRow.concat(row);
    }
    return newRow;
  });
}

export function countTrees(skiMap: boolean[][], down: number, right: number) {
  let curX = 0;
  let curY = 0;
  let treeCount = 0;
  while (curY < skiMap.length) {
    if (skiMap[curY][curX]) {
      treeCount++;
    }
    curX += right;
    curY += down;
  }
  return treeCount;
}

export function findProductOfCounts(skiMap: boolean[][], slopes: number[][]) {
  let product = 1;
  slopes.forEach((slopeTuple) => {
    product *= countTrees(skiMap, slopeTuple[1], slopeTuple[0]);
  });
  return product;
}

export function findLargestSlope(slopes: [number, number][]): [number, number] {
  let largestSlope = 0;
  let largestSlopeIndex = 0;
  slopes.forEach((slopeTuple, idx) => {
    if (slopeTuple[0] > largestSlope) {
      largestSlope = slopeTuple[0];
      largestSlopeIndex = idx;
    }
  });

  return slopes[largestSlopeIndex];
}

export async function runThree() {
  const initialMap = await getList();
  let right = 3;
  let down = 1;
  const slopes: [number, number][] = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  const largestSlope = findLargestSlope(slopes);
  const skiMap = convertMap(initialMap);
  const neededWidth = calculateTotalWidth(
    skiMap,
    largestSlope[0],
    largestSlope[1]
  );
  const widened = widenMap(skiMap, neededWidth);
  console.log(`Part #1: ${countTrees(widened, down, right)}`);
  console.log(`Part #2: ${findProductOfCounts(widened, slopes)}`);
}
