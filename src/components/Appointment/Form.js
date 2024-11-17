import React, { useState } from "react";

import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [nameError, setNameError] = useState("");
  const [interviewerError, setInterviewerError] = useState("");

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  function validate() {
    if (name === "") {
      setNameError("student name cannot be blank");
      
      if(interviewer === null) {
        setInterviewerError("please select an interviewer");
        return;
      }

      return;
    }
  
    setInterviewerError("");
    setNameError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => {event.preventDefault();}}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => {
              setName(event.target.value);
            }}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{nameError}</section>
        <section className="appointment__validation">{interviewerError}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
