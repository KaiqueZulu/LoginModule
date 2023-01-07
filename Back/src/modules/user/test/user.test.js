import bcrypt from "bcrypt";

import userService from '../service/UserService.js'

//let password = await bcrypt.hash("123456", 10);

const MOCK_REQ_USER = {
    body: {
        name: 'User test',
        email: 'testuser@gmail.com',
        password: '123456',
    }
};


describe('Sample repository test field - CRUD', function () {
   
   it('Getting access token', async () => {
    console.log(MOCK_REQ_USER.body.password)

    let response = await userService.getAccessToken(MOCK_REQ_USER)
    console.log(response)
    console.log(MOCK_REQ_USER.body.password)
   })

});