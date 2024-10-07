import { calculateRewards } from "../utils/calculateRewards";

describe("testcases for calculating reward points by amount", () => {
  test("should get reward points correctly for amount greater than $100", () => {
    expect(calculateRewards(150)).toBe(150); // (150-100)*2 + 50
  });
  test("should get reward points correctly for amounts between $50 and $100", () => {
    expect(calculateRewards(75)).toBe(25); // (75-50)*1
  });
  test("should get reward points correctly for amount exactly $100", () => {
    expect(calculateRewards(100)).toBe(50); // (100-50)*1
  });
  test("should get reward points 0 for amount exactly $50", () => {
    expect(calculateRewards(50)).toBe(0);
  });
  test("should get reward points 0 for amounts lessthan $50", () => {
    expect(calculateRewards(20)).toBe(0);
  });
  test("should return 0 points for non-number input", () => {
    expect(calculateRewards("100")).toBe(0);
    expect(calculateRewards(null)).toBe(0);
    expect(calculateRewards(undefined)).toBe(0);
  });
  test("should correctly calculate points for prices with decimal values", () => {
    expect(calculateRewards(50.5)).toBe(0);
    expect(calculateRewards(75.75)).toBe(25);
    expect(calculateRewards(100.99)).toBe(51);
    expect(calculateRewards(150.5)).toBe(151);
  });
});
