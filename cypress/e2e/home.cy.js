//test suite

describe('test cases for login form', () => {
  beforeEach(() =>{
    //preconditions
     cy.visit('http://localhost:3000/');
  });

  //Positive testing and using AAA pattern
  it('should login using valid credentials', () =>{
    //Arrange
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password');

    //Action
    cy.get('#login-button').click();

    //Assert
    cy.on('window:alert', (txt) =>{
      expect(txt).to.contains('Login Successful!');
    });
  });
});