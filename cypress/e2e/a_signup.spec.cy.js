const fs = require('fs');

describe('Sign-Up Page Tests', () => {
  const generateRandomEmail = () => `user${Math.random().toString(36).substring(2, 11)}@yopmail.com`;
  const generateRandomPhone = () => `080${Math.floor(100000000 + Math.random() * 900000000)}`;
  const generateRandomUsername = () => `user_${Math.random().toString(36).substring(2, 8)}`;
  const randomPassword = 'Test@1234';

  beforeEach(() => {
    cy.visit('https://alphapay.netlify.app/auth/signup');
  });

  it('should show an error for mismatched passwords', () => {
    const email = generateRandomEmail();
    const phone = generateRandomPhone();

    cy.get('input[name="full_name"]').type('Jane Doe');
    cy.get('input[name="username"]').type(generateRandomUsername());
    cy.get('input[name="phone_number"]').type(phone);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(randomPassword);
    cy.get('input[name="confirmPassword"]').type('Mismatch@1234');

    cy.contains('Create Account').click();

    cy.contains('Both password need to be the same').should('be.visible');
  });

  it('should validate email format', () => {
    cy.get('input[name="email"]').type('invalidemail');
    cy.contains('Create Account').click();

    cy.contains('Hey,just letting you know that your email is quite weird').should('be.visible');
  });

  it('should validate required fields', () => {
    cy.contains('Create Account').click();

    cy.contains('Provide your full name please').should('be.visible');
    cy.contains('Provide a username please').should('be.visible');
    cy.contains('Provide your phone number please').should('be.visible');
    cy.contains('Provide your email please').should('be.visible');
    cy.contains('Provide a password please').should('be.visible');
  });

  it('should validate weak password', () => {
    const email = generateRandomEmail();
    const phone = generateRandomPhone();

    cy.get('input[name="full_name"]').type('Weak Password');
    cy.get('input[name="username"]').type(generateRandomUsername());
    cy.get('input[name="phone_number"]').type(phone);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type('123');
    cy.get('input[name="confirmPassword"]').type('123');

    cy.contains('Create Account').click();

    cy.contains('Password must be 9 characters or longer').should('be.visible');
  });

  it('should successfully sign up with valid inputs', () => {
    const fullName = 'John Doe';
    const username = generateRandomUsername();
    const phone = generateRandomPhone();
    const email = generateRandomEmail();
    const signupDetails = { email, username, password: randomPassword };

    cy.task('writeToFile', {
      filename: 'cypress/fixtures/signupDetails.json',
      content: signupDetails,
    });

    cy.get('input[name="full_name"]').type(fullName);
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="phone_number"]').type(phone);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(randomPassword);
    cy.get('input[name="confirmPassword"]').type(randomPassword);

    cy.contains('Create Account').click();

    cy.url().should('include', '/dashboard/overview');
    cy.contains('Welcome to your dashboard').should('be.visible');
  });
});
