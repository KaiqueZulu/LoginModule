import bcrypt from "bcrypt";
import assert from 'assert'

import userService from '../service/UserService.js'

//let password = await bcrypt.hash("123456", 10);

const MOCK_REQ_USER = {
    body: {
        name: 'User test',
        email: 'testuser@gmail.com',
        password: '123456',
    }
};


describe('User module test suite', function () {
   
   it('Getting access token', async () => {
    let expectedResponseAttributes = ['status', 'accessToken']
    let expectedResponseStatus = 200
    let response = await userService.getAccessToken(MOCK_REQ_USER)
    let actualResponseAttributes = Object.keys(response)
    let actualResponseStatus = response.status

    assert.deepStrictEqual(actualResponseAttributes, expectedResponseAttributes)
    assert.deepStrictEqual(actualResponseStatus, expectedResponseStatus)
   })
});