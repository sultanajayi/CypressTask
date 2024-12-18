describe('Log out  Test', () => {
    it('should be able to logout after successful login', () => {
      cy.fixture('signupDetails').then(({ email, password }) => {
        cy.visit('https://alphapay.netlify.app/auth/login');
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type(password);
        cy.contains('Sign In').click();
        cy.get('.dashboard_nav_profile > a > img').click();
        cy.get('[href="/coming-soon"]').click();
      


        
      });
    });
  });
  