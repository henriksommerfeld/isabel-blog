/// <reference types="Cypress" />

context('Mobile', () => {
  before(() => {
    cy.visit('/');
  });

  const titlePostfix = ' | Isabel Sommerfeld';

  it('Should open cookies page', () => {
    cy.findByTestId('cookie-alert')
      .findByTestId('about-cookies-link')
      .click()
      .url()
      .should('equal', Cypress.config().baseUrl + '/cookies');
  });

  it('Should remove cookies alert on OK click', () => {
    cy.findByTestId('cookie-alert')
      .findByText('Okej 🙄')
      .click()
      .findByTestId('cookie-alert')
      .should('not.exist');
  });

  it('Should open about me page', () => {
    cy.get('nav')
      .findByLabelText('Hamburger menu button')
      .click()
      .findByText('Om mig')
      .click()
      .url()
      .should('equal', Cypress.config().baseUrl + '/om')
      .findByTestId('page-title')
      .should('have.text', 'Om mig')
      .findByText('Kontakta mig på')
      .should('be.visible')
      .title()
      .should('equal', 'Om mig' + titlePostfix);
  });
});
