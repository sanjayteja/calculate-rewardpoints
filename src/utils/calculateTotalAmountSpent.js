import { calculateRewards } from "./calculateRewards";

export const calculateTotalAmountSpent = (data) => {
  return data.reduce((acc, transaction) => {
    if (!acc[transaction.name]) {
      acc[transaction.name] = { name: transaction.name, totalAmountSpent: 0 };
    }
    acc[transaction.name].totalAmountSpent += calculateRewards(
      transaction.amountSpent
    );
    return acc;
  }, {});
};
