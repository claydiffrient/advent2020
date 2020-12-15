import readline from "readline";
import fs from "fs";
import path from "path";

const FILE_PATH = path.resolve("assets", "inputTwo.txt");

export interface PasswordPolicy {
  min: number;
  max: number;
  char: string;
  password: string;
}

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

export function isValidPassword({
  min,
  max,
  char,
  password,
}: PasswordPolicy): boolean {
  const splitPass = password.split("");
  const instancesOfChar = splitPass.filter((x) => x === char);
  if (instancesOfChar.length > max) {
    return false;
  }
  if (instancesOfChar.length < min) {
    return false;
  }
  return true;
}

export function isValidPasswordWithUpdatedPolicy({
  min: positionOne,
  max: positionTwo,
  char,
  password,
}: PasswordPolicy): boolean {
  const oneBasedMap = new Map<number, string>();
  password.split("").forEach((char, index) => oneBasedMap.set(index + 1, char));
  const positionOneChar = oneBasedMap.get(positionOne);
  const positionTwoChar = oneBasedMap.get(positionTwo);
  if (positionOneChar === char && positionTwoChar === char) {
    return false;
  }
  if (positionOneChar !== char && positionTwoChar !== char) {
    return false;
  }
  if (positionOneChar === char) {
    return true;
  }
  if (positionTwoChar === char) {
    return true;
  }
  return false;
}

export function readPasswordPolicyLine(policyLine: string): PasswordPolicy {
  const splitParts = policyLine.split(" ");
  const splitCounts = splitParts[0].split("-");
  const min = Number.parseInt(splitCounts[0], 10);
  const max = Number.parseInt(splitCounts[1], 10);
  const char = splitParts[1][0];
  const password = splitParts[2];
  return {
    min,
    max,
    char,
    password,
  };
}

export async function runTwo() {
  const list = await getList();
  const policies = list.map((x) => readPasswordPolicyLine(x));
  const validPasswords = policies.filter((x) => isValidPassword(x));
  const validUpdatedPasswords = policies.filter((x) =>
    isValidPasswordWithUpdatedPolicy(x)
  );
  console.log(`Part One: ${validPasswords.length}`);
  console.log(`Part Two: ${validUpdatedPasswords.length}`);
}
