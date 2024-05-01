import React from "react";
import { render } from "@testing-library/react";
import CustomNavbar from "../navbar";

describe("CustomNavbar Component", () => {
  it("renders navigation links", () => {
    const { getByText } = render(<CustomNavbar />);
    expect(getByText("Home")).toBeInTheDocument();
    expect(getByText("Jobs")).toBeInTheDocument();
  });

  it("renders minimize, maximize, and close buttons", () => {
    const { getByLabelText } = render(<CustomNavbar />);
    expect(getByLabelText("Minimize")).toBeInTheDocument();
    expect(getByLabelText("Maximize")).toBeInTheDocument();
    expect(getByLabelText("Close")).toBeInTheDocument();
  });
});
