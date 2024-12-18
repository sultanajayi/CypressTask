describe('Checkout Payment Creation', () => {
    const generateRandomEmail = () =>
      `user${Math.random().toString(36).substring(2, 11)}@yopmail.com`;
    const generateRandomPhone = () =>
      `${Math.floor(10000 + Math.random() * 90000)}`;
  
    it('should return an error due to insufficient funds', () => {
      const email = generateRandomEmail();
      const amount = generateRandomPhone();
  
      cy.visit('https://checkout.koraapi.com/pay/QkPen8uAo893H1j');
      cy.get('#customer-name').type('John Doe');
      cy.get('#customer-email').type(email);
      cy.get('#link-amount').type(amount);
      cy.contains('Proceed').click();
      cy.contains('Pay with Debit Card').click();
      cy.get('#card-number').type('506066506066506067'); 
      cy.get('#card-expiry').type('0930');
      cy.get('#card-cvv').type('408');
      cy.get('.kpy-col-btn.card-init-form-btn').first().click(); 
      cy.contains(
        'There was an error while processing your payment. Please try again later.'
      ).should('be.visible');
    });
  
    it('should return a success message after successful payment', () => {
      const email = generateRandomEmail();
      const amount = generateRandomPhone();
  
      cy.visit('https://checkout.koraapi.com/pay/QkPen8uAo893H1j');
      cy.get('#customer-name').type('John Doe');
      cy.get('#customer-email').type(email);
      cy.get('#link-amount').type(amount);
      cy.contains('Proceed').click();
      cy.contains('Pay with Debit Card').click();
      cy.get('#card-number').type('5442056106072595');
      cy.get('#card-expiry').type('0930');
      cy.get('#card-cvv').type('123');
      cy.get('.kpy-col-btn.card-init-form-btn').first().click();
      cy.get('input[type="password"]').eq(0).type('1234');
      cy.get('#card-otp').eq(0).type('123456');
      cy.contains('Authorize').click();
    });
  });
  