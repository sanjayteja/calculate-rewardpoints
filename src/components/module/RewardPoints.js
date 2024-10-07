import React, { useEffect, useState } from "react";
import TotalRewards from "./TotalRewards";
import UserMonthlyRewards from "./UserMonthlyRewards";
import AllTransactions from "./AllTransactions";
import LoadingIndicator from "../LoadingIndicator";
import ErrorMessage from "../ErrorMessage";
import logger from "../../logger";
import { fetchData } from "../../services/fetchData";
import { calculateTotalAmountSpent } from "../../utils/calculateTotalAmountSpent";

const RewardPoints = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      try {
        const result = await fetchData("data.json");
        logger.log("set fetching data", data);
        const endDate = new Date("2024-02-29"); // End of Febraury 2024
        const startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 3); // last 3 months

        const filtered = result.filter((transaction) => {
          const transactionDate = new Date(
            transaction.transactionDate.split("/").reverse().join("-")
          );
          return transactionDate >= startDate && transactionDate <= endDate;
        });
        const sorted = filtered.sort(
          (a, b) =>
            new Date(a.transactionDate.split("/").reverse().join("-")) -
            new Date(b.transactionDate.split("/").reverse().join("-"))
        );
        setData(sorted);
      } catch (error) {
        logger.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);
  console.log("data", data);
  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error} />;
  const totalAmountSpentByCustomer = calculateTotalAmountSpent(data);
  return (
    <>
      <h4 style={{ color: "#e60ca5", textAlign: "center" }}>
        Last three months Transactions
      </h4>
      <hr />
      <div className="tableContainer">
        <div className="tableSection">
          <p>Total Rewards</p>
          <TotalRewards totalRewards={totalAmountSpentByCustomer} />
        </div>
        <div className="tableSection">
          <p>User Monthly Rewards</p>
          <UserMonthlyRewards transactions={data} />
        </div>
        <div className="tableSection">
          <p>All Transactions</p>
          <AllTransactions allTransactions={data} />
        </div>
      </div>
    </>
  );
};

export default RewardPoints;
