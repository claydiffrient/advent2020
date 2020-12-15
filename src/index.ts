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
  return [1, 1];
}

export function getMultipliedValue(values: number[]): number {
  const nums = getSumTo2020(values);
  return nums[0] * nums[1];
}

export async function run() {
  // const inputs = await getList();
  // console.log(
  //   `Part One: ${inputs
  //     .map((x) => getFuelForMass(x))
  //     .reduce((prev, cur) => prev + cur)}`
  // );
  // console.log(
  //   `Part Two: ${inputs
  //     .map((x) => getTotalFuel(x))
  //     .reduce((prev, cur) => prev + cur)}`
  // );
}
