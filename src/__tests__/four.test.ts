import {
  parsePassport,
  getList,
  getMostlyValidPassports,
  getFullyValidPassports,
} from "../four";

describe("getList", () => {
  it("reads in file data and returns an array of strings", async () => {
    expect(await getList("testFour.txt")).toEqual([
      "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm",
      "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884 hcl:#cfa07d byr:1929",
      "hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm",
      "hcl:#cfa07d eyr:2025 pid:166559648 iyr:2011 ecl:brn hgt:59in",
    ]);
  });
});

describe("parsePassport", () => {
  it("parses out fields", () => {
    const input =
      "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm";
    const result = parsePassport(input);
    expect(result).toEqual({
      ecl: "gry",
      pid: "860033327",
      eyr: "2020",
      hcl: "#fffffd",
      byr: "1937",
      iyr: "2017",
      cid: "147",
      hgt: "183cm",
    });
  });

  it("handles missing cid", () => {
    const input =
      "hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm";
    const result = parsePassport(input);
    expect(result).toEqual({
      hcl: "#ae17e1",
      iyr: "2013",
      eyr: "2024",
      ecl: "brn",
      pid: "760753108",
      byr: "1931",
      hgt: "179cm",
    });
  });
});

describe("getMostlyValidPassports", () => {
  it("returns an array containing all passports with proper fields", async () => {
    const stringList = await getList("testFour.txt");
    const valids = getMostlyValidPassports(stringList);
    expect(valids).toHaveLength(2);
    expect(valids).toEqual([
      {
        ecl: "gry",
        pid: "860033327",
        eyr: "2020",
        hcl: "#fffffd",
        byr: "1937",
        iyr: "2017",
        cid: "147",
        hgt: "183cm",
      },
      {
        hcl: "#ae17e1",
        iyr: "2013",
        eyr: "2024",
        ecl: "brn",
        pid: "760753108",
        byr: "1931",
        hgt: "179cm",
      },
    ]);
  });
});

describe("getFullyValidPassports", () => {
  it("does not return invalid passports", async () => {
    const stringList = await getList("testFourInvalid.txt");
    const valids = getFullyValidPassports(stringList);
    expect(valids).toHaveLength(0);
  });

  it("returns valid passports", async () => {
    const stringList = await getList("testFourValid.txt");
    const valids = getFullyValidPassports(stringList);
    expect(valids).toHaveLength(4);
  });
});
