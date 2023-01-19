import bcrypt from 'bcrypt';
import assert from 'assert';
import MockExpressRequest  from 'mock-express-response';

import userController from '../../modules/user/controller/userController.js';

//let password = await bcrypt.hash("123456", 10);

const MOCK_REQ_USER = {
    body: {
        name: 'User test',
        email: 'testuser@gmail.com',
        password: '123456',
    }
};


 


describe('User module test suite', function () {
    it('Create user', async () => {
        const MOCK_RES_USER = new MockExpressRequest();
        let expectedResponseAttributes = ['status','user'];
        let response = await userController.createUser(MOCK_REQ_USER, MOCK_RES_USER)
        let actualResponseAttributes = Object.keys(response._getJSON())
        assert.deepStrictEqual(actualResponseAttributes, expectedResponseAttributes)
    })

    it('Getting access token', async () => {
        const MOCK_RES_USER = new MockExpressRequest();
        let expectedResponseAttributes = ['status', 'accessToken']
        let expectedResponseStatus = 200
        let response = await userController.getAccessToken(MOCK_REQ_USER, MOCK_RES_USER)
        let answerData = response._getJSON()
        let actualResponseAttributes = Object.keys(answerData)
        let actualResponseStatus = answerData.status
        assert.deepStrictEqual(actualResponseAttributes, expectedResponseAttributes)
        assert.deepStrictEqual(actualResponseStatus, expectedResponseStatus)
    })

});