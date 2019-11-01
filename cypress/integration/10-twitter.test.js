/// <reference types="Cypress" />

function hasKeys() {
  return (
    Cypress.env('TWITTER_CONSUMER_KEY') &&
    Cypress.env('TWITTER_SECRET') &&
    Cypress.env('TWITTER_BEARER_TOKEN')
  );
}

context('Twitter tests', () => {
  it(`Start page should show tweets`, () => {
    if (!hasKeys()) return;

    cy.visit('/')
      .findByText('@isommerfeld på Twitter')
      .should('be.visible')
      .should('have.attr', 'href', 'https://twitter.com/isommerfeld');
  });
});
