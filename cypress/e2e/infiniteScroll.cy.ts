describe('Infinite Scroll functionality', () => {
  beforeEach(() => {
    // Set viewport size
    cy.viewport(1920, 1080);

    // Intercept the initial API request
    cy.intercept('GET', 'https://swapi.dev/api/people**').as('getPeople');

    // Visit the page
    cy.visit('http://localhost:5173');

    // Wait for the initial API request to complete
    cy.wait('@getPeople');
    cy.get('tbody tr').should('have.length.greaterThan', 0); // Wait for rows to load
  });

  it('should fetch more people when scrolling to the bottom', () => {
    // Verify the initial rows are rendered
    cy.get('tbody tr').should('have.length', 21); // Assuming 10 rows are loaded initially

    // Scroll to the bottom of the table
    cy.get('.overflow-x-auto').scrollTo('bottom');

    // Wait for the second API request to complete
    cy.wait('@getPeople');

    // Verify that more rows are loaded
    cy.get('tbody tr').should('have.length.greaterThan', 21); // More rows should be added
  });
});
