import React from "react";
import { render, waitFor } from "@testing-library/react";
import TopKeywords from "../../job/topKeywords";
import { getTopKeywords } from "@lib/api";

jest.mock("@lib/api", () => ({
  getTopKeywords: jest.fn(() =>
    Promise.resolve({ data: { data: ["keyword1", "keyword2", "keyword3"] } })
  ),
}));

describe("TopKeywords Component", () => {
  it("renders hot keywords", async () => {
    // Render the component
    const { getByText } = render(<TopKeywords />);

    // Wait for the component to render
    await waitFor(() => expect(getByText("Hot Keywords")).toBeInTheDocument());

    await waitFor(() => {
      // Assert that the mocked getTopKeywords function has been called
      expect(getTopKeywords).toHaveBeenCalled();

      // Assert against the output of the mocked getTopKeywords function
      expect(getByText("keyword1")).toBeInTheDocument();
      expect(getByText("keyword2")).toBeInTheDocument();
      expect(getByText("keyword3")).toBeInTheDocument();
    });
  });
});
