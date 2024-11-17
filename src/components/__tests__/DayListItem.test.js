import React from "react";
import { render, cleanup } from "@testing-library/react";
import DayListItem from "components/DayListItem";

afterEach(cleanup);

describe("The day list item", () => {
  it("renders the DayListItem", () => {
    render(<DayListItem name="Monday" spots={5} />)
  })
})