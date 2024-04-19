import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "../layout";

describe("Layout", () => {
  it("renders children and navbar", () => {
    render(
      <Layout>
        <div data-testid="child">Child component</div>
      </Layout>
    );

    const navbarElement = screen.getByLabelText("navigation");
    expect(navbarElement).toBeInTheDocument();

    const childElement = screen.getByTestId("child");
    expect(childElement).toBeInTheDocument();
  });
});
