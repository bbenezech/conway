import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "./app";

describe("App", () => {
  it("should somehow work", () => {
    render(<App />);
    expect(screen.getByText("Conway's Game of Life")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Random/ }));
    fireEvent.click(screen.getByRole("button", { name: /Start/ }));
    fireEvent.click(screen.getByRole("button", { name: /Clear/ }));
  });
});
