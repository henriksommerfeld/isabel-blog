/// <reference types="Cypress" />
import { startPageTitle } from './08-cms-edit-start.test';

context('Desktop', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.findByTestId('desktop-nav').should('be.visible');
  });

  const titlePostfix = ` | ${startPageTitle}`;

  it('Should open cookies page', () => {
    cy.findByTestId('about-cookies-link')
      .click()
      .url()
      .should('equal', Cypress.config().baseUrl + '/cookies');
  });

  it('Should remove cookies alert on OK click', () => {
    cy.findByLabelText('Acceptera cookies').click();
    cy.findByTestId('cookie-alert').should('not.exist');
  });

  it('Should open Published page', () => {
    const pageName = 'Publicerat';
    cy.findByTestId('desktop-nav')
      .contains(pageName)
      .click()
      .url()
      .should('equal', Cypress.config().baseUrl + '/publicerat');

    cy.findByTestId('page-title')
      .should('have.text', pageName)
      .title()
      .should('equal', pageName + titlePostfix);
  });

  it('Should open About Me page', () => {
    const pageName = 'Om mig';
    cy.findByTestId('desktop-nav')
      .contains(pageName)
      .click()
      .url()
      .should('equal', Cypress.config().baseUrl + '/om');

    cy.findByTestId('page-title').should('have.text', pageName);

    cy.findByText('Kontakta mig på')
      .should('be.visible')
      .title()
      .should('equal', pageName + titlePostfix);
  });

  it('Should open Press images page', () => {
    const pageName = 'Pressbilder';
    cy.findByTestId('desktop-nav')
      .contains(pageName)
      .click()
      .url()
      .should('equal', Cypress.config().baseUrl + '/pressbilder');

    cy.findByTestId('page-title')
      .should('have.text', pageName)
      .title()
      .should('equal', pageName + titlePostfix);
  });

  it('Start page should show more posts', () => {
    cy.visit('/', {
      onBeforeLoad: win => {
        win.sessionStorage.clear();
      },
    });

    cy.findAllByRole('article').should('have.length', 5);

    cy.findByText('Visa äldre inlägg').click({ force: true });

    cy.findAllByRole('article')
      .its('length')
      .should('be.gte', 5);
  });

  const samplePost = {
    title: 'Isabel deltar i kvällens Uppdrag Granskning',
    url: '/2012/04/18/isabel-sommerfeld-deltar-i-kvallens-uppdrag-granskning',
  };

  it('Post should have share links', () => {
    cy.visit(samplePost.url);
    cy.findByTestId('share-links');
    cy.findByText('Dela på Facebook').should('be.visible');
    cy.findByText('Dela på Twitter').should('be.visible');
    cy.findByText('Dela på LinkedIn').should('be.visible');
  });

  it('Post should have comments button', () => {
    cy.visit(samplePost.url);
    cy.findByTestId('comments-button')
      .scrollIntoView()
      .click({ force: true });
    cy.get('#disqus_thread').should('be.visible');
    cy.findByTestId('comments-button').should('not.exist');
  });
});
