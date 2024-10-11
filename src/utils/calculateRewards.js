export const calculateRewards = (price) => {
  let points = 0;

  // Check if the input price is not a number, return 0 if so
  if (typeof price !== "number") {
    return 0;
  }

  // Calculate points for prices greater than 100
  if (price > 100) {
    points += (price - 100) * 2; // 2 points for every dollar spent over 100
    points += 50; // Additional 50 points for spending over 100
  }
  // Calculate points for prices between 51 and 100
  else if (price > 50) {
    points += price - 50; // 1 point for every dollar spent over 50
  }

  return Math.floor(points);
};
