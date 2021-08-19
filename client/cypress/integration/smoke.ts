import { userGenerator } from '../../test/data-generators';

describe('smoke', () => {
  it('should handle normal app flow', () => {
    cy.visit('/');

    const user = userGenerator();

    // signup
    cy.findByRole('link', { name: /sign up/i }).click();

    cy.findByRole('textbox', {
      name: /name/i,
    }).type(user.name);

    cy.findByRole('textbox', {
      name: /email/i,
    }).type(user.email);

    cy.findByLabelText(/password/i).type(user.password);

    cy.findByRole('button', { name: /sign up/i }).click();

    cy.url().should('include', '/profile');

    cy.findByRole('textbox', {
      name: /name/i,
    }).should('have.value', user.name);

    // logout
    cy.findByRole('button', { name: user.name.charAt(0).toUpperCase() }).click();
    cy.findByRole('button', { name: /log out/i }).click();

    // login
    cy.findByRole('textbox', {
      name: /email/i,
    }).type(user.email);

    cy.findByLabelText(/password/i).type(user.password);
    cy.findByRole('button', { name: /log in/i }).click();
    cy.url().should('include', '/profile');

    // search and view product
    cy.findByRole('textbox', {
      name: /name/i,
    }).should('have.value', user.name);

    cy.findByRole('textbox', {
      name: /search product/i,
    }).type('brown jacket{enter}');

    cy.wait(3000);

    cy.findByText(/brown jacket/i).click();

    cy.wait(3000);

    // cart
    cy.findByRole('button', { name: /add to cart/i }).click();
    cy.findByText('Successfully added to cart').should('exist');

    cy.findByRole('link', { name: /cart/i }).click();

    cy.findByRole('main').within(() => {
      cy.findAllByRole('listitem').should('have.length', 1);
      cy.findAllByRole('listitem')
        .first()
        .within(() => {
          cy.findByRole('button', { name: /delete/i }).click();
        });
      cy.findAllByRole('listitem').should('have.length', 0);
      cy.findByText('Your cart is empty :(').should('exist');
    });
  });
});
