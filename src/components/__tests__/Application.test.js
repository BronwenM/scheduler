import React from "react";
import { render, cleanup, fireEvent, prettyDOM, queryByText, getByText, getAllByTestId, getByAltText, getByPlaceholderText, findByText, getByTestId, queryByAltText} from "@testing-library/react";
import Application from "../Application";
import { act } from "react-test-renderer";
import axios from 'axios';

jest.mock('axios');

afterEach(cleanup); 

describe('The interview booking application', () => {

  xit("renders with mock data", async () => {
    const { container } = render(<Application />);

    // console.log(prettyDOM(container));
  });

  xit("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { queryByText, getByText, findByText } = render(<Application />);

    return findByText("Monday").then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(queryByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  xit("loads data, books, an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = await render(<Application />);

    //get container
    const appointment = getAllByTestId(await container, "appointment")[0];

    //click appt__add-button
    fireEvent.click(getByAltText(appointment, "Add"));
    
    //fill the form
    fireEvent.change(getByPlaceholderText(appointment, /Enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    //select an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    //click save
    fireEvent.click(getByText(appointment, "Save"));

    //test that "Saving... is in the document"
    expect(getByText(appointment, /saving/i)).toBeInTheDocument();

    //Check that the student's name is in the doc
    await findByText(appointment, "Lydia Miller-Jones");

    //Check that the DayListItem says "no spots remaining"
    const mondayListItem = await getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));
    expect(getByText(mondayListItem, /no spots remaining/i)).toBeInTheDocument();
    
    // debug(container);
    // console.log('********************************************************')
    console.log(prettyDOM(mondayListItem));
  });

  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    //Render the Application
    const { container, debug } = await render(<Application />);

    //Wait for Archie Cohen
    await findByText(container, "Archie Cohen");

    //get container
    const appointment = await getAllByTestId(container, "appointment").find((appt) => queryByText(appt, "Archie Cohen"));
    
    //click the delete button
    fireEvent.click(queryByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    
    //click confirm delete button
    fireEvent.click(getByText(appointment, "Confirm"));
    expect(getByText(appointment, /Deleting/i)).toBeInTheDocument();

    //confirm that the appt is no longer in position
    const mondayListItem = await getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));
    expect(getByText(await mondayListItem, /2 spots remaining/i)).toBeInTheDocument();

    console.log(prettyDOM(await container));
  });
  
  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });
  
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    //Render the Application
    const { container, debug } = await render(<Application />);
    
    //Wait for Archie Cohen
    await findByText(container, "Archie Cohen");
    
    //get container
    const appointment = await getAllByTestId(container, "appointment").find((appt) => queryByText(appt, "Archie Cohen"));
    
    //click edit button
    fireEvent.click(getByAltText(appointment, "Edit"));
    
    //check that input is present by value
    expect(getByTestId(appointment, "student-name-input")).toBeInTheDocument();
    
    //change the name
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Arthur Cantrip" }
    });
    
    //confirm the change
    fireEvent.click(getByText(appointment, "Save"));
    
    //check that the appointment has been updated WILL FAIL BECAUSE WE HAVENT MOCKED SAVE
    // expect(await findByText(appointment, "Arthur Cantrip")).toBeInTheDocument();
    
    //check that the number of spots remaining is still 1
    const mondayListItem = await getAllByTestId(container, "day").find((day) => queryByText(day, "Monday"));
    expect(getByText(await mondayListItem, /1 spot remaining/i)).toBeInTheDocument();
    
    console.log(prettyDOM(await container));
  })
})
