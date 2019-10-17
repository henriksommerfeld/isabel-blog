/// <reference types="Cypress" />

context('Mobile', () => {
  before(() => {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.viewport('macbook-13');
  });

  const keyword = 'Belarus';
  const expectedPost = {
    title: 'Isabel deltar i kvällens Uppdrag Granskning',
    url: '/2012/04/18/isabel-sommerfeld-deltar-i-kvallens-uppdrag-granskning',
  };

  it('Should open search results', () => {
    cy.findByLabelText('Ange dina sökord här...')
      .type(keyword)
      .findByTestId('search-results')
      .contains(`träffar för ${keyword}`)
      .should('be.visible');
  });

  it('Should find expected post', () => {
    cy.findByText(expectedPost.title)
      .click()
      .url()
      .should('equal', Cypress.config().baseUrl + expectedPost.url)
      .findByTestId('search-results')
      .should('not.exist');
  });

  it('Should have expected tag', () => {
    const tagsUrl = `${Cypress.config().baseUrl}/taggar/${encodeURI(
      keyword.toLowerCase()
    )}`;
    cy.url()
      .should('equal', Cypress.config().baseUrl + expectedPost.url)
      .findByTestId('tags')
      .findByText(keyword)
      .click()
      .url()
      .should('equal', tagsUrl)
      .findByText('Se alla taggar')
      .should('be.visible');
  });

  it('Should show previous search when navigating back', () => {
    cy.go('back')
      .url()
      .should('equal', Cypress.config().baseUrl + expectedPost.url)
      .findByTestId('search-results')
      .should('not.exist')
      .go('back')
      .url()
      .should('equal', Cypress.config().baseUrl + '/');
  });

  it('Should close search on close button click', () => {
    cy.findByLabelText('Stäng sökresultatet')
      .click()
      .findByTestId('search-results')
      .should('not.exist');
  });
});
