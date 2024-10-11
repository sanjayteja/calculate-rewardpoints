import React from "react";
import { render, screen } from "@testing-library/react";
import AllTransactions from "../components/module/AllTransactions";
import { calculateRewards } from "../utils/calculateRewards";
import ReusableTable from "../components/ReusableTable";

jest.mock("../components/ReusableTable");
jest.mock("../utils/calculateRewards");

describe("AllTransactions Component", () => {
  const allTransactions = [
    {
      transactionId: 1,
      customerId: 101,
      name: "John Doe",
      transactionDate: "2024-01-10",
      product: "Gadget",
      amountSpent: 200,
    },
    {
      transactionId: 2,
      customerId: 102,
      name: "Jane Smith",
      transactionDate: "2024-01-11",
      product: "Gizmo",
      amountSpent: 50,
    },
  ];

  beforeEach(() => {
    ReusableTable.mockImplementation(({ columns, data }) => {
      return (
        <div data-testid="reusable-table">
          {data.map((row, index) => (
            <div key={index}>
              {columns.map((column) => (
                <div key={column.key}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    });
    calculateRewards.mockClear();
    calculateRewards.mockImplementation((amount) => {
      if (amount > 100) {
        return (amount - 100) * 2 + 50;
      } else if (amount > 50) {
        return amount - 50;
      }
      return 0;
    });
  });

  it("renders without crashing", () => {
    const { getByText } = render(
      <AllTransactions allTransactions={allTransactions} />
    );
    expect(getByText("All Transactions")).toBeInTheDocument();
  });

  it("passes the correct data to ReusableTable", () => {
    const { getByTestId } = render(
      <AllTransactions allTransactions={allTransactions} />
    );
    const table = getByTestId("reusable-table");
    expect(table).toBeInTheDocument();
  });

  it("displays transaction details correctly", () => {
    render(<AllTransactions allTransactions={allTransactions} />);
    const tableProps = ReusableTable.mock.calls[0][0];
    expect(tableProps.data).toEqual(allTransactions);
    expect(tableProps.columns).toEqual([
      { key: "transactionId", header: "Transaction Id" },
      { key: "customerId", header: "customerId" },
      { key: "name", header: "Customer Name" },
      {
        key: "transactionDate",
        header: "Purchase Date",
        render: expect.any(Function),
      },
      { key: "product", header: "Product Purchased" },
      {
        key: "amountSpent",
        header: "Price",
        render: expect.any(Function),
        style: { textAlign: "right" },
      },
      {
        key: "rewardPoints",
        header: "Reward Points",
        render: expect.any(Function),
        style: { textAlign: "right" },
      },
    ]);
  });

  it("calculates reward points correctly", () => {
    render(<AllTransactions allTransactions={allTransactions} />);
    expect(calculateRewards).toHaveBeenCalledWith(200);
    expect(calculateRewards).toHaveBeenCalledWith(50);
  });
});
