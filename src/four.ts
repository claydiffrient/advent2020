import readline from "readline";
import fs from "fs";
import path from "path";
import { stringify } from "querystring";

interface Passport extends Record<string, string | undefined> {
  byr: string; // Birth Year
  iyr: string; // Issue Year
  eyr: string; // Expiration Year
  hgt: string; // Height
  hcl: string; // Hair Color
  ecl: string; // Eye Color
  pid: string; // Passport ID
  cid?: string; // Country ID
}

export function getList(fileName: string): Promise<string[]> {
  const FILE_PATH = path.resolve("assets", fileName);
  return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(FILE_PATH),
    });

    const results: string[] = [];
    let tempString = "";
    readInterface.on("line", (line) => {
      if (line == "") {
        results.push(tempString.trim());
        tempString = "";
      } else {
        tempString += line + " ";
      }
    });
    readInterface.on("close", () => {
      results.push(tempString.trim()); // Get the last temp in
      resolve(results);
    });
  });
}

export function parsePassport(passportFile: string): Passport {
  let passport: Record<string, string | undefined> = {};
  passportFile.split(" ").forEach((entry) => {
    const split = entry.split(":");
    passport[split[0]] = split[1];
  });
  return passport as Passport;
}

export function hasProperFields(pp: Passport) {
  const REQUIRED_KEYS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const keys = Object.keys(pp);
  return REQUIRED_KEYS.every((k) => keys.includes(k));
}

function validBYR(byr: string) {
  const num = Number.parseInt(byr, 10);
  return num >= 1920 && num <= 2002;
}

function validIYR(iyr: string) {
  const num = Number.parseInt(iyr, 10);
  return num >= 2010 && num <= 2020;
}

function validEYR(eyr: string) {
  const num = Number.parseInt(eyr, 10);
  return num >= 2020 && num <= 2030;
}

function validHGT(hgt: string) {
  const matches = hgt.match(/(\d+)(cm|in)/);
  if (matches) {
    const value = matches[1];
    const num = Number.parseInt(value, 10);
    const measure = matches[2];
    if (measure === "cm") {
      return num >= 150 && num <= 193;
    }
    if (measure === "in") {
      return num >= 59 && num <= 76;
    }
  }
  return false;
}

function validHCL(hcl: string) {
  return /^#[0-9a-f]{6}/i.test(hcl);
}

function validECL(ecl: string) {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl);
}

function validPID(pid: string) {
  return pid.length === 9;
}

export function isValid(pp: Passport) {
  return (
    validBYR(pp.byr) &&
    validIYR(pp.iyr) &&
    validEYR(pp.eyr) &&
    validHGT(pp.hgt) &&
    validHCL(pp.hcl) &&
    validECL(pp.ecl) &&
    validPID(pp.pid)
  );
}

export function getMostlyValidPassports(passportStrings: string[]): Passport[] {
  return passportStrings
    .map((ps) => parsePassport(ps))
    .filter((pp) => hasProperFields(pp));
}

export function getFullyValidPassports(passportStrings: string[]): Passport[] {
  return passportStrings
    .map((ps) => parsePassport(ps))
    .filter((pp) => hasProperFields(pp))
    .filter((pp) => isValid(pp));
}

export async function runFour() {
  const passportStrings = await getList("inputFour.txt");
  const validPassports = getMostlyValidPassports(passportStrings);
  console.log(`Part One: ${validPassports.length}`);
  console.log(`Part Two: ${getFullyValidPassports(passportStrings).length}`);
}
