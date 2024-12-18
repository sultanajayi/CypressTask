describe('Update Profile', () => {
    const generateRandomFullname = () => {
      const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie'];
      const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Davis'];
      const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      return `${randomFirstName} ${randomLastName}`;
    };
  
    const generateRandomUsername = () => `user_${Math.random().toString(36).substring(2, 8)}`;
  
    it('should successfully update fullname and username', () => {
      const fullName = generateRandomFullname();
      const username = generateRandomUsername();
  
      cy.visit('https://alphapay.netlify.app/auth/login');
      cy.get('input[name="email"]').type('ttestar419@yopmail.com'); 
      cy.get('input[name="password"]').type('Testar419$');  
      cy.contains('Sign In').click();
      cy.get('.dashboard_nav_profile > a > img').click();
      cy.get('input[name="full_name"]').clear().type(fullName);
      cy.get('input[name="username"]').clear().type(username);
      cy.contains('Update Details').click();
    });
  });
  