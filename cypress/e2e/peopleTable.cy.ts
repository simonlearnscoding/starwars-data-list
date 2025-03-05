export {};
describe('People Table with Real API', () => {
  beforeEach(() => {
    // Set viewport size
    cy.viewport(1920, 1080);

    // using a fixture here to make the tests faster
    cy.intercept('GET', 'https://swapi.dev/api/people', { fixture: 'people.json' }).as('getPeople');
    cy.visit('http://localhost:5173');
    cy.get('tbody tr').should('have.length.greaterThan', 0);
  });

  it('should display the correct table headers', () => {
    const headers = ['Name', 'Height', 'Mass', 'Created', 'Edited', 'Planet'];
    headers.forEach((header) => {
      cy.contains('th', header).should('be.visible');
    });
  });

  it('should display a list of people', () => {
    cy.get('tbody tr').should('have.length.greaterThan', 0);
  });

  it('should correctly format created & edited dates', () => {
    cy.get('tbody tr')
      .first()
      .within(() => {
        cy.get('td')
          .eq(3)
          .invoke('text')
          .should('match', /\d{1,2}\/\d{1,2}\/\d{4}/); // Date format check
        cy.get('td')
          .eq(4)
          .invoke('text')
          .should('match', /\d{1,2}\/\d{1,2}\/\d{4}/);
      });
  });

  it('should display a clickable planet link', () => {
    cy.get('tbody tr').first().find('a').should('contain.text', 'View Planet').click();

    // Verify navigation to the planet page
    cy.url().should('include', '/planets/');
  });
});
