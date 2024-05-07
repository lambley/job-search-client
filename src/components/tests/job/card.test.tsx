import React from "react";
import { render } from "@testing-library/react";
import Card from "../../job/card";
import { emptyJobsResponse } from "@lib/emptyResponses";

describe("Card Component", () => {
  it("renders job details correctly", () => {
    const { getByText } = render(<Card {...emptyJobsResponse} />);

    expect(getByText("Job Title")).toBeInTheDocument();
    expect(getByText("This is a company name.")).toBeInTheDocument();
    expect(getByText("£20,000 / Not Specified")).toBeInTheDocument();
    expect(getByText("This is a job description.")).toBeInTheDocument();
    expect(getByText(/1 January 2021/)).toBeInTheDocument();
    expect(getByText(/123456789/)).toBeInTheDocument();
  });

  it("transforms title to title case", () => {
    const { getByText } = render(
      <Card {...emptyJobsResponse} title="backend developer" />
    );
    expect(getByText("Backend Developer")).toBeInTheDocument();
  });

  it("formats salary to currency", () => {
    const { getByText } = render(
      <Card {...emptyJobsResponse} salary_min={40000} salary_max={60000} />
    );
    expect(getByText("£40,000 / Not Specified")).toBeInTheDocument();
  });

  it("displays 'Not Specified' if contract type is missing", () => {
    const { getByText } = render(
      <Card {...emptyJobsResponse} contract_type={undefined} />
    );
    expect(getByText("£20,000 / Not Specified")).toBeInTheDocument();
  });

  it("displays 'Not Specified' if created date is missing", () => {
    const { getByText } = render(
      <Card {...emptyJobsResponse} created={undefined} />
    );
    expect(getByText(/Not Specified/)).toBeInTheDocument();
  });
});
