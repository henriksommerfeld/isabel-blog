/// <reference types="Cypress" />
import { startPageTitle } from './08-cms-edit-start.test';

context('Mobile', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport('iphone-6');
  });

  const hamburgerMenuLabel = 'Hamburger menu button';

  it('Should open Published page', () => {
    const pageName = 'Publicerat';
    cy.get('nav').within(() => {
      cy.findByLabelText(hamburgerMenuLabel).click();
    });

    cy.findByTestId('mobile-menu')
      .contains(pageName)
      .click()
      .url()
      .should('equal', Cypress.config().baseUrl + '/publicerat');
    cy.findByTestId('page-title')
      .should('have.text', pageName)
      .title()
      .should('contain', pageName);
  });

  it('Should open About Me page', () => {
    const pageName = 'Om mig';
    cy.get('nav').within(() => {
      cy.findByLabelText(hamburgerMenuLabel).click();
    });

    cy.findByTestId('mobile-menu')
      .contains(pageName)
      .click()
      .url()
      .should('equal', Cypress.config().baseUrl + '/om');

    cy.findByTestId('page-title').should('have.text', pageName);

    cy.findByText('Kontakta mig på')
      .should('be.visible')
      .title()
      .should('contain', pageName);
  });

  it('Should open Press images page', () => {
    const pageName = 'Pressbilder';
    cy.get('nav').within(() => {
      cy.findByLabelText(hamburgerMenuLabel).click();
    });

    cy.findByTestId('mobile-menu')
      .contains(pageName)
      .click()
      .url()
      .should('equal', Cypress.config().baseUrl + '/pressbilder');

    cy.findByTestId('page-title')
      .should('have.text', pageName)
      .title()
      .should('contain', pageName);
  });

  it('Start page should show more posts', () => {
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.sessionStorage.clear();
      },
    });

    cy.findAllByRole('article').should('have.length', 5);

    cy.findByText('Visa äldre inlägg').click({ force: true });

    cy.findAllByRole('article').its('length').should('be.gte', 5);
  });
});
