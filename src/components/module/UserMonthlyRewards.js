import React, { useMemo } from "react";
import { calculateRewards } from "../../utils/calculateRewards";
import ReusableTable from "../ReusableTable";
import { getMonthName } from "../../utils/getMonthName";

const UserMonthlyRewards = ({ transactions }) => {
  // useMemo to memoize result object based on transactions
  const result = useMemo(() => {
    return transactions.reduce(
      (
        acc,
        { customerId, name, amountSpent, transactionDate, transactionId }
      ) => {
        const [, month, year] = transactionDate.split("/");
        const monthYear = `${month}/${year}`;
        if (!acc[monthYear]) {
          acc[monthYear] = {};
        }
        if (!acc[monthYear][customerId]) {
          acc[monthYear][customerId] = { name, transactions: [] };
        }
        acc[monthYear][customerId].transactions.push({
          transactionId,
          transactionDate,
          transactionYear: year,
          amountSpent,
          points: calculateRewards(amountSpent),
        });
        return acc;
      },
      {}
    );
  }, [transactions]);

  // useMemo to memoize and generate tables for each month-year group
  const monthlyTables = useMemo(() => {
    return Object.entries(result).map(([monthYear, customers]) => {
      const [month, year] = monthYear.split("/");
      const monthName = getMonthName(month);

      // Flattening customer transactions into a single array
      const data = Object.entries(customers).flatMap(
        ([customerId, customerData]) => {
          return customerData.transactions.map((transaction) => ({
            customerId,
            name: customerData.name,
            ...transaction,
          }));
        }
      );

      // Sorting the data by transaction date
      const sortedData = data.sort((a, b) => {
        const [dayA, monthA, yearA] = a.transactionDate.split("/");
        const [dayB, monthB, yearB] = b.transactionDate.split("/");
        return (
          new Date(`${yearA}-${monthA}-${dayA}`) -
          new Date(`${yearB}-${monthB}-${dayB}`)
        );
      });

      const userMonthlyRewardsTable = [
        { key: "customerId", header: "Customer Id" },
        { key: "name", header: "Customer Name" },
        { key: "transactionId", header: "Transaction Id" },
        { key: "transactionDate", header: "Transaction Date" },
        { key: "transactionYear", header: "Transaction Year" },
        {
          key: "amountSpent",
          header: "Amount Spent",
          render: (value) => `$${value}`,
          style: { textAlign: "right" },
        },
        { key: "points", header: "Points", style: { textAlign: "right" } },
      ];

      return (
        <div key={monthYear}>
          <h4>
            {monthName} {year}
          </h4>
          <ReusableTable
            columns={userMonthlyRewardsTable}
            data={sortedData}
            keyField="transactionId"
          />
        </div>
      );
    });
  }, [result]);

  return (
    <>
      <h3>User Monthly Rewards</h3>
      {monthlyTables}
    </>
  );
};

export default UserMonthlyRewards;
