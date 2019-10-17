/// <reference types="Cypress" />

// context('CMS create/delete', () => {
//   beforeEach(() => {
//     cy.viewport('macbook-13');
//     cy.clearCookies();
//     cy.clearLocalStorage();
//   });

//   it('Should create post', () => {
//     cy.fixture('bara-ben').then(article => {
//       cy.visit('/admin')
//         .findByText('Login to File System')
//         .click()
//         .findByText('New Bloggpost')
//         .click()
//         .get('#title-field-1')
//         .type(article.title)
//         .get('[data-slate-editor="true"]')
//         .click()
//         // .invoke('val', article.body)
//         // .trigger('change')
//         .type(article.body)
//         .findByText('Publish')
//         .click()
//         .findByText('Publish now')
//         .click()
//         .visit('/')
//         .findByText(article.title)
//         .click()
//         .findByText(article.title);
//     });
//   });

// it('Should see created post', () => {
//   cy.fixture('bara-ben').then(article => {
//     cy.visit('/')
//       .findByText(article.title)
//       .click()
//       .findByText(article.title);
//   });
// });

// it('Should delete created post', () => {
//   cy.fixture('bara-ben').then(article => {
//     cy.visit('/admin')
//       .findByText('Login to File System')
//       .click()
//       .findByText(article.title)
//       .click()
//       .findByText('Delete entry')
//       .click();
//   });
// });
//});
