import { render } from "@testing-library/react";
import TotalRewards from "../components/module/TotalRewards";
import { ResuableTable } from "../utils/reusableTable";

// mock the ReusableTable component
jest.mock("../utils/reusableTable.js", () => ({
  ResuableTable: jest.fn(() => <div>Mocked ReusableTable</div>),
}));
describe("TotalRewards Component", () => {
  const totalRewards = {
    user1: { name: "User 1", totalAmountSpent: 100 },
    user2: { name: "User 2", totalAmountSpent: 200 },
  };
  it("should render without crashing", () => {
    const { container } = render(<TotalRewards totalRewards={totalRewards} />);
    expect(container).toBeInTheDocument();
  });
  it("should pass the correct columns to ReusableTable", () => {
    render(<TotalRewards totalRewards={totalRewards} />);
    const expectedColumns = [
      { key: "name", header: "Name" },
      {
        key: "totalAmountSpent",
        header: "Reward Points",
        style: { textAlign: "right" },
      },
    ];
    expect(ResuableTable).toHaveBeenCalledWith(
      expect.objectContaining({ columns: expectedColumns }),
      {}
    );
  });
  it("should convert totalRewards object to an array and pass it to ReusableTable", () => {
    render(<TotalRewards totalRewards={totalRewards} />);
    const expectedData = [
      { name: "User 1", totalAmountSpent: 100 },
      { name: "User 2", totalAmountSpent: 200 },
    ];
    expect(ResuableTable).toHaveBeenCalledWith(
      expect.objectContaining({ data: expectedData }),
      {}
    );
  });
  it("should use 'name' as the keyField for ReusableTable", () => {
    render(<TotalRewards totalRewards={totalRewards} />);
    expect(ResuableTable).toHaveBeenCalledWith(
      expect.objectContaining({ keyField: "name" }),
      {}
    );
  });
});
