import React from "react";
import { calculateRewards } from "../../utils/calculateRewards";
import { formatDate } from "../../utils/formatDate";
import { ResuableTable } from "../../utils/reusableTable";

const UserMonthlyRewards = ({ transactions }) => {
  const result = {};
  transactions.forEach(({ customerId, name, amountSpent, transactionDate }) => {
    const [, month, year] = transactionDate.split("/");
    const monthYear = `${month}/${year}`;
    if (!result[customerId]) {
      result[customerId] = { name, monthlySpending: {} };
    }
    if (!result[customerId].monthlySpending[monthYear]) {
      result[customerId].monthlySpending[monthYear] = 0;
    }
    result[customerId].monthlySpending[monthYear] +=
      calculateRewards(amountSpent);
  });
  console.log("result", result);

  const flattenedData = Object.entries(result).flatMap(
    ([customerId, customerData]) => {
      return Object.entries(customerData.monthlySpending).map(
        ([monthYear, amountSpent, transactionId]) => {
          return {
            customerId,
            name: customerData.name,
            monthYear,
            amountSpent,
            transactionId,
          };
        }
      );
    }
  );
  const userMonthlyRewardsTable = [
    { key: "customerId", header: "Cust.id" },
    { key: "name", header: "Name" },
    {
      key: "monthYear",
      header: "Month & Year",
      render: (value) => formatDate(value),
    },
    {
      key: "amountSpent",
      header: "Reward Points",
      style: { textAlign: "right" },
    },
  ];
  console.log("flattenedData", flattenedData);
  return (
    <>
      <ResuableTable
        columns={userMonthlyRewardsTable}
        data={flattenedData}
        keyField="transactionId"
      />
    </>
  );
};

export default UserMonthlyRewards;
