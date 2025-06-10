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

  //Negative test using the AAA pattern
  it('should display error message if password is wrong', () =>{
    //Arrange
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password123123');

    //Action
    cy.get('#login-button').click();

    //Assert
    cy.on('window:alert', (txt) =>{
      expect(txt).to.contains('login unsuccessful! please try again!');
    });
  });

  //simulate some one logging in too many times. brute force testing
  it('check for multiple failed login attempts', ()=>{

    for(let i = 0; i < 5; i++){
     //Arrange
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('password123123');
    //Action
    cy.get('#login-button').click();
    }

    //Assert
    cy.on('window:alert', (txt) =>{
      expect(txt).to.contains('You have submitted too many times');
    });
  });
});