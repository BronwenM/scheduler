describe('Appointments', () => {
  beforeEach(() => {
    //Reset the database before the test runs
    cy.request("GET", "/api/debug/reset");

    //Visit appointment booking site
    cy.visit('/');

    //Check that the day Monday is present
    cy.contains("[data-testid=day]", "Monday");
  });

  xit('should book an interview', () => {
    
    //Get the first add button, and click it
    cy.get("[alt=Add]")
      .first()
      .click();

    //Get the input for the student name and type in "Lydia Miller-Jones"
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    
    //Select "Sylvia Palmer" as the interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click();  

    //Click the save button
    cy.contains("button", "Save")
      .click();

    //Verify that the new appointment is showing
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  xit('should edit an interview', () => {    
    //Click the edit button of the first interview (force because display: none unless hovered)
    cy.get("[alt='Edit']")
      .first()
      .click({force: true});
    
    //Change Student Name
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");
    
    //Selec Tori Malcom as the new interviewer 
    cy.get("[alt='Tori Malcolm']")
      .click(); 

    //Click the save button
    cy.contains("button", "Save")
      .click();
  });

  it('should cancel an interview', () => {
    //Click the delete button of the first interview (force because display: none unless hovered)
    cy.get("[alt='Delete']")
      .first()
      .click({force: true});

    //Click the confirm button
    cy.contains("button", "Confirm")
      .click();

    //Confirm the Deleting indicator exists
    cy.contains("Deleting").should("exist");

    //Check that the Deleting indicator no longer exists
    cy.contains("Deleting").should("not.exist");
    
    //Check that no appointment for the student "Archie Cohen" exists
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
    
  });
})