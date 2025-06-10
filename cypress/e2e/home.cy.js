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

///simulate some one logging in too many times. brute force testing
it('check for multiple failed login attempts', ()=>{
   let alertMessages = [];
   
   // Set up alert handler to capture all messages
   cy.window().then((win) => {
     cy.stub(win, 'alert').callsFake((message) => {
       alertMessages.push(message);
     });
   });
   
   // Perform 5 failed login attempts
   for(let i = 0; i < 5; i++){
     //Arrange
     cy.get('#email').clear().type('test@example.com');
     cy.get('#password').clear().type('password243');
     //Action
     cy.get('#login-button').click();
   }
   
   //Assert
   cy.then(() => {
     // Check that we got 5 alerts total
     expect(alertMessages).to.have.length(5);
     
     // Check the first 3 are failure messages
     expect(alertMessages[0]).to.equal('login unsuccessful! please try again!');
     expect(alertMessages[1]).to.equal('login unsuccessful! please try again!');
     expect(alertMessages[2]).to.equal('login unsuccessful! please try again!');
     
     // Check attempts 4 and 5 show "too many times" message
     expect(alertMessages[3]).to.equal('You have submitted too many times');
     expect(alertMessages[4]).to.equal('You have submitted too many times');
   });
});

});