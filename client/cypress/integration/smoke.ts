import { userGenerator } from '../../test/data-generators';

describe('smoke', () => {
  it('should handle normal app flow', () => {
    cy.visit('/');

    const user = userGenerator();

    // signup
    cy.findByRole('link', { name: /sign up/i }).click();
    cy.wait(3000);

    cy.findByRole('textbox', {
      name: /name/i,
    }).type(user.name);
    cy.findByRole('textbox', {
      name: /email/i,
    }).type(user.email);
    cy.findByLabelText(/password/i).type(user.password);

    cy.findByRole('button', { name: /sign up/i }).click();

    cy.wait(3000);

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

    cy.wait(3000);

    cy.url().should('include', '/profile');

    // search and view product
    cy.findByRole('textbox', {
      name: /name/i,
    }).should('have.value', user.name);

    cy.findByRole('textbox', {
      name: /search product/i,
    }).type('brown jacket{enter}');

    cy.wait(5000);

    cy.findByText(/brown jacket/i).click();

    cy.wait(3000);

    // cart
    cy.findByRole('button', { name: /add to cart/i }).click();
    cy.findByText('Successfully added to cart').should('exist');

    cy.findByRole('link', { name: /cart/i }).click();

    cy.wait(3000);

    cy.findByRole('main').within(() => {
      cy.findAllByRole('listitem').should('have.length', 1);
    });

    // checkout
    cy.findByRole('button', { name: /check out/i }).click();
    cy.url().should('include', '/checkout');

    cy.wait(3000);

    cy.getStripeElement('cardNumber').type('4242424242424242');

    cy.getStripeElement('cardExpiry').type('1122');

    cy.getStripeElement('cardCvc').type('123');

    cy.getStripeElement('postalCode').type('12345');

    cy.findByRole('button', { name: 'Confirm Order' }).click();

    cy.wait(12000);

    // view orders
    cy.url().should('include', '/orders');

    cy.findByRole('main').within(() => {
      cy.findAllByRole('listitem').should('have.length', 1);
    });
  });
});
