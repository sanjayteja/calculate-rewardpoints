import React from "react";
import { calculateRewards } from "../../utils/calculateRewards";
import ReusableTable from "../ReusableTable";

const AllTransactions = ({ allTransactions }) => {
  const allTransactionsTable = [
    { key: "transactionId", header: "Transaction Id" },
    { key: "customerId", header: "customerId" },
    { key: "name", header: "Customer Name" },
    {
      key: "transactionDate",
      header: "Purchase Date",
      render: (transactionDate) => transactionDate,
    },
    { key: "product", header: "Product Purchased" },
    {
      key: "amountSpent",
      header: "Price",
      render: (value) => `$${parseFloat(value)}`,
      style: { textAlign: "right" },
    },
    {
      key: "rewardPoints",
      header: "Reward Points",
      render: (value, row) => calculateRewards(row.amountSpent),
      style: { textAlign: "right" },
    },
  ];
  return (
    <>
      <h4>All Transactions</h4>
      <ReusableTable
        columns={allTransactionsTable}
        data={allTransactions}
        keyField="transactionId"
      />
    </>
  );
};

export default AllTransactions;
