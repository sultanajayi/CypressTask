describe('Password Change Test', () => {
    it('should log in using details saved and change password successfully', () => {
      cy.fixture('signupDetails').then(({ email, password }) => {
        cy.visit('https://alphapay.netlify.app/auth/login');
        cy.get('input[name="email"]').type(email);
        cy.get('input[name="password"]').type(password);
        cy.contains('Sign In').click();
        cy.get('.dashboard_nav_profile > a > img').click();
        cy.get('[href="/dashboard/settings/security"]').click();
        cy.get('input[name="password"]').type(password)
        cy.get('input[name="new_password"]').type(password)
        cy.contains('Change Password').click();


        
      });
    });
  });
  