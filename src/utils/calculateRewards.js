export const calculateRewards = (price) => {
  let points = 0;
  if (typeof price !== "number") {
    return 0;
  }
  if (price > 100) {
    points += (price - 100) * 2;
    points += 50;
  } else if (price > 50) {
    points += price - 50;
  }
  return Math.floor(points);
};
