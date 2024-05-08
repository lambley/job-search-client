import React from "react";
import { render, waitFor } from "@testing-library/react";
import TopKeywords from "../../job/topKeywords";
import { getTopKeywords } from "@lib/api";

jest.mock("@lib/api", () => ({
  getTopKeywords: jest.fn(() =>
    Promise.resolve({ data: { data: ["test1", "test2", "test3"] } })
  ),
}));

describe("TopKeywords Component", () => {
  it("renders hot keywords", async () => {
    const { getByText } = render(<TopKeywords />);

    await waitFor(() => expect(getByText("Hot Keywords")).toBeInTheDocument());

    await waitFor(() => {
      expect(getTopKeywords).toHaveBeenCalled();

      expect(getByText("test1")).toBeInTheDocument();
      expect(getByText("test2")).toBeInTheDocument();
      expect(getByText("test3")).toBeInTheDocument();
    });
  });

  it("fetches and renders top keywords", async () => {
    render(<TopKeywords />);
    await waitFor(() => expect(getTopKeywords).toHaveBeenCalledTimes(1));
  });

  it("handles error when fetching top keywords", async () => {
    (getTopKeywords as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch top keywords")
    );

    const { getByText } = render(<TopKeywords />);

    await waitFor(() => {
      expect(getTopKeywords).toHaveBeenCalled();

      // renders the default keywords in the useState method
      expect(getByText("keyword1")).toBeInTheDocument();
      expect(getByText("keyword2")).toBeInTheDocument();
      expect(getByText("keyword3")).toBeInTheDocument();
    });
  });
});
