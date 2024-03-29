/// <reference types="Cypress" />
const startPageTitle = 'Isabel Sommerfeld'

const samplePage = {
  url: '/pressbilder',
};

context('CMS Press Images Page Edit', () => {
  before(() => {
    cy.visit(samplePage.url);
    window.localStorage.setItem('cookies-accepted', true);
  });

  beforeEach(() => {
    cy.viewport('macbook-13');
  });

  it('Should be possible to enter edit mode', () => {
    cy.findByTitle('Redigera sidan')
      .invoke('attr', 'href')
      .then((href) => {
        cy.visit(href);
      });
  });

  const descriptionSelector = '#description-field-1';
  const descriptionText = '🐱‍🐉';
  const mainTextSelector = '[contenteditable="true"]';
  const mainText = 'Imse vimse 🕷, klättrá uppför 🕸';

  it('Should login to CMS', () => {
    cy.findByText('Login to File System')
      .click()
      .get(mainTextSelector)
      .should('be.visible');
  });

  const title = 'Pressbilder';
  //const pageTitle = `${title} | ${startPageTitle}`;

  it('Should edit page', () => {
    cy.get(descriptionSelector)
      .clear()
      .type(descriptionText)
      .get(mainTextSelector)
      .click({ force: true })
      .should('be.visible')
      .clear()
      .type(mainText)
      .root();

    cy.findByText('Publish').click();

    cy.findByText('Publish now').click();

    cy.findByText('Changes saved')
      .click()
      .get('h1')
      .should('be.visible')
      .should('have.text', 'Sidor');

    // cy.visit(samplePage.url).then(() => {
    //   cy.get('h1').should('have.text', title).should('be.visible');

    //   cy.get('title').should('have.text', pageTitle);

    //   cy.get('meta[property="og:title"]').should(
    //     'have.attr',
    //     'content',
    //     pageTitle
    //   );

    //   cy.get('meta[property="og:description"]').should(
    //     'have.attr',
    //     'content',
    //     descriptionText
    //   );

    //   cy.get('main').contains(mainText);
    // });
  });
});
