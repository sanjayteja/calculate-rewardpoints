import React from "react";
import { render } from "@testing-library/react";
import UserMonthlyRewards from "../components/module/UserMonthlyRewards";
import { calculateRewards } from "../utils/calculateRewards";
import { getMonthName } from "../utils/getMonthName";
import ReusableTable from "../components/ReusableTable";
jest.mock("../components/ReusableTable");
jest.mock("../utils/calculateRewards");
jest.mock("../utils/getMonthName");

describe("UserMonthlyRewards Component", () => {
  const transactions = [
    {
      transactionId: 1,
      customerId: 101,
      name: "John Doe",
      transactionDate: "01/01/2024",
      amountSpent: 150,
    },
    {
      transactionId: 2,
      customerId: 102,
      name: "Jane Smith",
      transactionDate: "15/01/2024",
      amountSpent: 50,
    },
  ];

  beforeEach(() => {
    ReusableTable.mockImplementation(({ columns, data }) => (
      <div data-testid="reusable-table" />
    ));
    calculateRewards.mockImplementation((amount) => Math.floor(amount / 10));
    getMonthName.mockImplementation((month) => {
      switch (month) {
        case "01":
          return "January";
        default:
          return "Unknown";
      }
    });
  });

  it("renders without crashing", () => {
    const { getByText } = render(
      <UserMonthlyRewards transactions={transactions} />
    );
    expect(getByText("User Monthly Rewards")).toBeInTheDocument();
  });

  it("displays month and year correctly", () => {
    const { getByText } = render(
      <UserMonthlyRewards transactions={transactions} />
    );
    expect(getByText("January 2024")).toBeInTheDocument();
  });

  it("passes the correct data to ReusableTable", () => {
    const { getByTestId } = render(
      <UserMonthlyRewards transactions={transactions} />
    );
    const table = getByTestId("reusable-table");
    expect(table).toBeInTheDocument();
  });

  it("calculates reward points correctly", () => {
    render(<UserMonthlyRewards transactions={transactions} />);
    expect(calculateRewards).toHaveBeenCalledWith(150);
    expect(calculateRewards).toHaveBeenCalledWith(50);
  });
});
