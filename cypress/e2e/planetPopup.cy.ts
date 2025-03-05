describe('Planet Popup', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept('GET', 'https://swapi.dev/api/people**').as('getPeople');
    cy.visit('http://localhost:5173');
    cy.wait('@getPeople');
  });

  it('should open the planet popup when clicking the planet link', () => {
    cy.get('tbody tr').first().find('a').click();
    cy.get('[data-testid="planet-popup"]').should('be.visible');
  });

  it('should display planet details in the popup', () => {
    cy.get('tbody tr').first().find('a').click();

    cy.get('[data-testid="planet-popup"]').within(() => {
      // Check that there's a title element present
      cy.get('h2').should('be.visible');

      cy.contains('Diameter');
      cy.contains('Climate');
      cy.contains('Population');
    });
  });

  it('should close the popup when clicking on the X button', () => {
    cy.get('tbody tr').first().find('a').click();
    cy.get('[data-testid="planet-popup"]').should('be.visible');
    cy.get('button[aria-label="Close modal"]').click();
    cy.get('[data-testid="planet-popup"]').should('not.exist');
  });
  it('should close the popup when clicking outside ', () => {
    cy.get('tbody tr').first().find('a').click();
    cy.get('body').click(0, 0);
    cy.get('[data-testid="planet-popup"]').should('not.exist');
  });
});
