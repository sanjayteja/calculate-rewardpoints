import React, { useCallback, useEffect, useMemo, useState } from "react";
import TotalRewards from "./TotalRewards";
import UserMonthlyRewards from "./UserMonthlyRewards";
import AllTransactions from "./AllTransactions";
import LoadingIndicator from "../LoadingIndicator";
import ErrorMessage from "../ErrorMessage";
import logger from "../../logger";
import { fetchData } from "../../services/fetchData";
import { calculateTotalAmountSpent } from "../../utils/calculateTotalAmountSpent";

const CustomerRewardsDashboard = () => {
  // State for storing transactions data
  const [data, setData] = useState([]);
  // State for tracking loading status
  const [loading, setLoading] = useState(false);
  // State for handling errors
  const [error, setError] = useState(null);

  // Memoize endDate to a specific date
  const endDate = useMemo(() => new Date("2024-02-29"), []);

  // Calculate startDate, three months before endDate
  const startDate = useMemo(() => {
    const date = new Date(endDate);
    date.setMonth(endDate.getMonth() - 3);
    return date;
  }, [endDate]);

  // Async function to fetch data, filter and sort it
  const fetchDataAsync = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchData("data.json");
      logger.log("fetching data", data);

      // Filter and sort transactions
      const filteredAndSorted = result
        .filter((transaction) => {
          const [day, month, year] = transaction.transactionDate.split("/");
          const transactionDate = new Date(`${year}-${month}-${day}`);
          return transactionDate >= startDate && transactionDate <= endDate;
        })
        .sort((a, b) => {
          const [dayA, monthA, yearA] = a.transactionDate.split("/");
          const [dayB, monthB, yearB] = b.transactionDate.split("/");
          return (
            new Date(`${yearA}-${monthA}-${dayA}`) -
            new Date(`${yearB}-${monthB}-${dayB}`)
          );
        });
      setData(filteredAndSorted);
    } catch (error) {
      logger.log(error);
      setError("Failed to fetch data, Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  // Fetch data on component mount or when fetchDataAsync changes
  useEffect(() => {
    fetchDataAsync();
  }, [fetchDataAsync]);

  // Display loading indicator if data is being fetched
  if (loading) return <LoadingIndicator />;
  // Display error message if there's an error
  if (error) return <ErrorMessage message={error} />;

  // Calculate total amount spent by customers
  const totalAmountSpentByCustomer = calculateTotalAmountSpent(data);

  return (
    <>
      <p style={{ fontSize: "22px", marginLeft: "10px" }}>
        Retailer Reward Program Tables:
      </p>
      <div className="box">
        <UserMonthlyRewards transactions={data} />
        <TotalRewards totalRewards={totalAmountSpentByCustomer} />
        <AllTransactions allTransactions={data} />
      </div>
    </>
  );
};

export default CustomerRewardsDashboard;
