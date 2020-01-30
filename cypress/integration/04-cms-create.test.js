/// <reference types="Cypress" />

context('CMS create/delete blog post', () => {
  beforeEach(() => {
    cy.viewport('macbook-13');
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Should create post', () => {
    cy.fixture('bara-ben').then(article => {
      cy.visit('/admin');

      cy.findByText('Login to File System').click();

      cy.findByText('New Bloggpost').click();

      cy.get('#title-field-1')
        .clear()
        .type(article.title)
        .get('[data-slate-editor="true"]')
        .click()
        .type(article.body);

      cy.findByText('Publish').click();

      cy.findByText('Publish now').click();

      cy.findByText('Changes saved').click();

      cy.findByText('New Bloggpost').should('be.visible');
    });
  });

  it('Should see created post', () => {
    cy.fixture('bara-ben').then(article => {
      cy.visit('/');
      cy.findByText(article.title).click();
      cy.findByText(article.title);
    });
  });

  it('Should delete created post', () => {
    cy.fixture('bara-ben').then(article => {
      cy.visit('/admin');
      cy.findByText('Login to File System').click();

      cy.findByText(article.title).click();

      cy.findByText('Delete entry').click();
    });
  });
});
