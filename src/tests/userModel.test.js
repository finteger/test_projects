const mongoose = require('mongoose');
const { User, createUser } = require('../functions/userModel.js');

//test suite
describe('User Model Test', () => {
    //jest hook
    beforeEach(() =>{
        jest.clearAllMocks;
    });

    it('should create a new user', () =>{
        //Arrange
        const mockUser = {
            firstName: 'Todd Nash',
            email: 'todd.nash@rdpolytech',
            password: 'password',
            age: 100
        }

        //Action
        const result1 = jest.spyOn(User.prototype, 'save').mockResolvedValue(mockUser);
        const result2 = new createUser('Todd Nash', 'todd.nash@rdpolytech', 'password', 100);

        //Assert
        expect(result1).toEqual(result2);
        expect(User.prototype.save()).toHaveBeenCalledTimes(1);

    });
});