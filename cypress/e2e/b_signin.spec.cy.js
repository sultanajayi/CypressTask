describe('Sign-In Page Tests', () => {
  beforeEach(() => {
    
    cy.visit('https://alphapay.netlify.app/auth/login');
  });

  it('should successfully sign in with valid credentials', () => {
   
    cy.get('input[name="email"]').type('ttestar419@yopmail.com'); 
    cy.get('input[name="password"]').type('Testar419$');  
   
    
    cy.contains('Sign In').click();
   

  })

  it('should show an error for incorrect credentials', () => {
   
    cy.get('input[name="email"]').type('ttestar419@yopmail.com'); 
    cy.get('input[name="password"]').type('ValidPassword123!');  
   
   
    cy.contains('Sign In').click();
    cy.contains('Invalid Credentials').should('be.visible');

  })

  it('should show validation error for empty password', () => {
   
    cy.get('input[name="email"]').type('validuser@example.com'); 
   
    cy.contains('Sign In').click();
    cy.contains('Provide a password please').should('be.visible');

  })

})
