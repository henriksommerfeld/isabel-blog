/// <reference types="Cypress" />

context('Desktop', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport('macbook-15');
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

  it('Should open Published page', () => {
    const pageName = 'Publicerat';
    cy.get('nav')
      .findByText(pageName)
      .click()
      .url()
      .should('equal', Cypress.config().baseUrl + '/publicerat')
      .findByTestId('page-title')
      .should('have.text', pageName)
      .title()
      .should('equal', pageName + titlePostfix);
  });

  it('Should open About Me page', () => {
    const pageName = 'Om mig';
    cy.get('nav')
      .findByText(pageName)
      .click()
      .url()
      .should('equal', Cypress.config().baseUrl + '/om')
      .findByTestId('page-title')
      .should('have.text', pageName)
      .findByText('Kontakta mig på')
      .should('be.visible')
      .title()
      .should('equal', pageName + titlePostfix);
  });

  it('Should open Press images page', () => {
    const pageName = 'Pressbilder';
    cy.get('nav')
      .findByText(pageName)
      .click()
      .url()
      .should('equal', Cypress.config().baseUrl + '/pressbilder')
      .findByTestId('page-title')
      .should('have.text', pageName)
      .title()
      .should('equal', pageName + titlePostfix);
  });

  it('Start page should show more posts', () => {
    cy.visit('/', {
      onBeforeLoad: win => {
        win.sessionStorage.clear();
      },
    })
      .findAllByRole('article')
      .should('have.length', 5)
      .findByText('Visa äldre inlägg')
      .click()
      .findAllByRole('article')
      .its('length')
      .should('be.gte', 5);
  });

  const samplePost = {
    title: 'Isabel deltar i kvällens Uppdrag Granskning',
    url: '/2012/04/18/isabel-sommerfeld-deltar-i-kvallens-uppdrag-granskning',
  };

  it('Post should have share links', () => {
    cy.visit(samplePost.url)
      .findByTestId('share-links')
      .findByText('Dela på Facebook')
      .should('be.visible')
      .findByText('Dela på Twitter')
      .should('be.visible')
      .findByText('Dela på LinkedIn')
      .should('be.visible');
  });

  it('Post should have comments button', () => {
    cy.visit(samplePost.url)
      .findByTestId('comments-button')
      .findByText('Visa kommentarer')
      .click()
      .get('#disqus_thread')
      .should('be.visible')
      .findByTestId('comments-button')
      .should('not.exist');
  });
});
