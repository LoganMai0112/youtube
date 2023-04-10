/* eslint-disable no-shadow */
/* eslint-disable no-undef */

const url = Cypress.env('localhost_url');
console.log(url);
describe('Increase view when watch video', () => {
  it('Visits the MyTube', () => {
    cy.visit(url);
    cy.wait(3000);
    cy.get('.aspect-video').first().click();
    cy.wait(3000);
    cy.get('#view')
      .contains('views')
      .then(($el) => {
        const initialValue = parseInt($el.text(), 10);
        cy.reload();
        cy.wait(3000);
        cy.get('#view')
          .contains('views')
          .should(($el) => {
            const newValue = parseInt($el.text(), 10);
            expect(newValue).to.equal(initialValue + 1);
          });
      });
  });
});

describe('Censor bad words in comment', () => {
  it("Replace bad words by '*'", () => {
    cy.visit(`${url}/login`);
    cy.get('#email').type('mailam123@gmail.com');
    cy.get('#password').type('mailam123');
    cy.get('input[type="submit"]').click();

    cy.wait(5000);
    cy.visit(url);

    cy.get('.aspect-video').first().click();
    cy.wait(3000);
    cy.get('#comment_input').type('dit');
    cy.get('#submit_comment').click({ force: true });
    cy.wait(3000);
    cy.get('.comment').first().invoke('text').should('include', '***');
  });
});
