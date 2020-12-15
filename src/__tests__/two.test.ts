import {
  isValidPassword,
  readPasswordPolicyLine,
  PasswordPolicy,
  isValidPasswordWithUpdatedPolicy,
} from "../two";

describe("isValidPassword", () => {
  it("returns true for valid passwords", () => {
    expect(
      isValidPassword({ min: 1, max: 3, char: "a", password: "abcde" })
    ).toBe(true);
    expect(
      isValidPassword({ min: 2, max: 9, char: "c", password: "ccccccccc" })
    ).toBe(true);
  });
  it("returns false for invalid passwords", () => {
    expect(
      isValidPassword({ min: 1, max: 3, char: "b", password: "cdefg" })
    ).toBe(false);
  });
});

describe("isValidPasswordWithUpdatedPolicy", () => {
  it("returns true for valid passwords", () => {
    expect(
      isValidPasswordWithUpdatedPolicy({
        min: 1,
        max: 3,
        char: "a",
        password: "abcde",
      })
    ).toBe(true);
  });
  it("returns false for invalid passwords", () => {
    expect(
      isValidPasswordWithUpdatedPolicy({
        min: 1,
        max: 3,
        char: "b",
        password: "cdefg",
      })
    ).toBe(false);
    expect(
      isValidPasswordWithUpdatedPolicy({
        min: 2,
        max: 9,
        char: "c",
        password: "ccccccccc",
      })
    ).toBe(false);
  });
});

describe("readPasswordPolicyLine", () => {
  it("returns a proper Policy object", () => {
    expect(readPasswordPolicyLine("1-3 a: abcde")).toEqual<PasswordPolicy>({
      min: 1,
      max: 3,
      char: "a",
      password: "abcde",
    });
  });
});
