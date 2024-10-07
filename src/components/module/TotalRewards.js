import React from "react";
import { ResuableTable } from "../../utils/reusableTable";

const TotalRewards = ({ totalRewards }) => {
  const totalPointsTable = [
    { key: "name", header: "Name" },
    {
      key: "totalAmountSpent",
      header: "Reward Points",
      style: { textAlign: "right" },
    },
  ];
  // converting the totalRewards object to an array of values
  const rewards = Object.values(totalRewards);
  return (
    <>
      <ResuableTable
        columns={totalPointsTable}
        data={rewards}
        keyField="name"
      />
    </>
  );
};

export default TotalRewards;