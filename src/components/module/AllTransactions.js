import React from "react";
import { calculateRewards } from "../../utils/calculateRewards";
import { ResuableTable } from "../../utils/reusableTable";

const AllTransactions = ({ allTransactions }) => {
  const allTransactionsTable = [
    { key: "index", header: "", render: (value, row, index) => index + 1 },
    { key: "transactionId", header: "Transaction Id" },
    { key: "name", header: "Name" },
    {
      key: "transactionDate",
      header: "Date",
      render: (value) => value.split("/").reverse().join("-"),
    },
    { key: "product", header: "Product" },
    { key: "amountSpent", header: "Price", render: (value) => `$${value}` },
    {
      key: "rewardPoints",
      header: "Reward Points",
      style: { textAlign: "right" },
      render: (value, row) => calculateRewards(row.amountSpent),
    },
  ];
  return (
    <>
      <ResuableTable
        columns={allTransactionsTable}
        data={allTransactions}
        keyField="transactionId"
      />
    </>
  );
};

export default AllTransactions;
