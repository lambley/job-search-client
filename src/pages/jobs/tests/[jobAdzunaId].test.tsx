import React from "react";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import Job from "../[jobAdzunaId]";
import { getJob } from "@lib/api";
import { emptyJobsResponse } from "@lib/emptyResponses";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@lib/api", () => ({
  getJob: jest.fn(),
}));

describe("Job component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { jobAdzunaId: "123" },
    });
  });

  it("renders job details correctly", async () => {
    const mockJobResponse = {
      ...emptyJobsResponse,
      title: "Software Developer",
    };

    (getJob as jest.Mock).mockResolvedValue({ data: mockJobResponse });

    render(<Job job={mockJobResponse} />);

    const jobTitleElement = await screen.findByText(mockJobResponse.title);

    expect(jobTitleElement).toBeInTheDocument();
  });

  it("displays fallback content when job data is empty", async () => {
    (getJob as jest.Mock).mockResolvedValue({ data: emptyJobsResponse });

    render(<Job job={emptyJobsResponse} />);

    const jobTitleElement = await screen.findByText(emptyJobsResponse.title);

    expect(jobTitleElement).toBeInTheDocument();
  });
});
