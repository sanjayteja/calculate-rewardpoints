import React from "react";
import ReusableTable from "../ReusableTable";

const TotalRewards = ({ totalRewards }) => {
  const totalPointsTable = [
    { key: "name", header: "Customer Name" },
    {
      key: "totalAmountSpent",
      header: "Total Reward Points",
    },
  ];
  // convert the totalRewards object to an array of values
  const rewards = Object.values(totalRewards);
  return (
    <>
      <h4>Total Rewards</h4>
      <ReusableTable
        columns={totalPointsTable}
        data={rewards}
        keyField="name"
      />
    </>
  );
};

export default TotalRewards;
