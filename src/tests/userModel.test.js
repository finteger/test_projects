const mongoose = require('mongoose');
const { User, createUser } = require('../functions/userModel.js');

//test suite
describe('User Model Test', () => {
    //jest hook
    beforeEach(() =>{
        jest.clearAllMocks;
    });

    it('should create a new user', async () =>{
        //Arrange
        const mockUser = {
            firstName: 'Todd Nash',
            email: 'todd.nash@rdpolytec.ca',
            password: 'password',
            age: 100,
        }
        //Action
        jest.spyOn(User.prototype, 'save').mockResolvedValue(mockUser);
        const result = await createUser('Todd Nash', 'todd.nash@rdpolytech.ca', 'password', 100
        );
        console.log(result);
        console.log(mockUser);
        //Assert
        expect(result).toEqual(expect.objectContaining(mockUser));
        expect(User.prototype.save()).toHaveBeenCalledTimes(1);
    });
});