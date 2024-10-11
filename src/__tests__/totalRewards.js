import React from "react";
import { render } from "@testing-library/react";
import TotalRewards from "../components/module/TotalRewards";
import ReusableTable from "../components/ReusableTable";

jest.mock("../components/ReusableTable");

describe("TotalRewards Component", () => {
  const totalRewards = {
    "John Doe": { name: "John Doe", totalAmountSpent: 150 },
    "Jane Smith": { name: "Jane Smith", totalAmountSpent: 50 },
  };

  beforeEach(() => {
    ReusableTable.mockImplementation(({ columns, data }) => (
      <div data-testid="reusable-table" />
    ));
  });

  it("renders without crashing", () => {
    const { getByText } = render(<TotalRewards totalRewards={totalRewards} />);
    expect(getByText("Total Rewards")).toBeInTheDocument();
  });

  it("passes the correct data to ReusableTable", () => {
    const { getByTestId } = render(
      <TotalRewards totalRewards={totalRewards} />
    );
    const table = getByTestId("reusable-table");
    expect(table).toBeInTheDocument();
  });

  it("displays customer names and total reward points correctly", () => {
    render(<TotalRewards totalRewards={totalRewards} />);
    const tableProps = ReusableTable.mock.calls[0][0];
    expect(tableProps.data).toEqual(Object.values(totalRewards));
    expect(tableProps.columns).toEqual([
      { key: "name", header: "Customer Name" },
      {
        key: "totalAmountSpent",
        header: "Total Reward Points",
      },
    ]);
  });

  it("has correct keyField for ReusableTable", () => {
    render(<TotalRewards totalRewards={totalRewards} />);
    const tableProps = ReusableTable.mock.calls[0][0];
    expect(tableProps.keyField).toBe("name");
  });
});
