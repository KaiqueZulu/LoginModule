import jwt from "jsonwebtoken";
import { promisify } from "util";

import Exception from "../../constants/Exception.js";
import * as secrets from "../../constants/secrets.js";
import * as httpStatus from "../../constants/httpStatus.js";

export default async (req, res, next) => {
   
    try {
        let token;
        let promiseAuthUser;
        let authenticatedUser;
        let {
            authorization: authorizationHeader
        } = req.headers;
        checkAuthorizationHeader(authorizationHeader);
        token = extractTokenHeaderAuthorization(authorizationHeader);
        promiseAuthUser = await jwtDecoder(token, secrets);
        authenticatedUser = promiseAuthUser.authUser;
        req.authenticatedUser = authenticatedUser;
        return next();
    } catch (err) {
        const status = err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({
            status,
            message: err.message
        });
    };

    function checkAuthorizationHeader(authorizationHeader){
        if (!authorizationHeader) throw new Exception(httpStatus.UNAUTHORIZED, "Access token was not informed.");
    };

    function extractTokenHeaderAuthorization(authorizationHeader){
        let token = "";
        let emptySpace = " ";
        if (authorizationHeader.includes(emptySpace)){
            token = authorizationHeader.split(emptySpace)[1];
        }else throw new Exception(httpStatus.BAD_REQUEST, "Header filled out of standard bearer");
        return token;
    };

    function jwtDecoder(token, apiKeySecret){
        return promisify(jwt.verify)(token, apiKeySecret.API_SECRET); 
    };
};