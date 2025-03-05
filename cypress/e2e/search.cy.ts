describe('Search Feature', () => {
  beforeEach(() => {
    // here it is important to have reliable data so the test won't fail
    // if the api data changes so I am using a fixture
    cy.intercept('GET', 'https://swapi.dev/api/people', { fixture: 'people.json' }).as('getPeople');
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:5173');
    cy.wait('@getPeople');
  });

  it('should filter the table when typing in the search bar', () => {
    cy.get('input[aria-label="Search Star Wars characters"]').type('Luke');
    // Two because the header is also a row
    cy.get('tbody tr').should('have.length', 2);
    cy.contains('td', 'Luke Skywalker').should('be.visible');
  });

  it('should display "No items match your query" when there are no results', () => {
    cy.get('input[aria-label="Search Star Wars characters"]').type('abcdefg');
    cy.contains('No items match your query').should('be.visible');
  });

  it('should clear the search when clicking the "X" button', () => {
    cy.get('input[aria-label="Search Star Wars characters"]').type('Luke');
    cy.get('[aria-label="Clear search"]').click();
    cy.get('input[aria-label="Search Star Wars characters"]').should('have.value', '');
  });

  it('should clear the search when pressing Escape', () => {
    cy.get('input[aria-label="Search Star Wars characters"]').type('Luke');
    cy.get('body').type('{esc}');
    cy.get('input[aria-label="Search Star Wars characters"]').should('have.value', '');
  });
});
