import jwt from "jsonwebtoken";
import { promisify } from "util";

import Exception from "../../constants/Exception.js";
import * as secrets from "../../constants/secrets.js";
import * as httpStatus from "../../constants/httpStatus.js";

export default async (req, res, next) => {
    try {
        let token;
        let promiseAuthUser;
        let authUser;
        let {
            authorization
        } = req.headers;
        checkAuthorizationHeader(authorization);
        token = extractTokenHeaderAuthorization(authorization);
        promiseAuthUser = await jwtDecoder(token, secrets);
        authUser = promiseAuthUser.authUser;
        req.authUser = authUser;
        return next();
    } catch (err) {
        const status = err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR;
        return res.status(status).json({
            status,
            message: err.message
        });
    };

    function checkAuthorizationHeader(headerAuthorization){
        if (!headerAuthorization) throw new Exception(httpStatus.UNAUTHORIZED, "Access token was not informed.");
    };

    function extractTokenHeaderAuthorization(headerAuthorization){
        let token = "";
        let emptySpace = " ";
        if (headerAuthorization.includes(emptySpace)){
            token = headerAuthorization.split(emptySpace)[1];
        }else throw new Exception(httpStatus.BAD_REQUEST, "Header filled out of standard bearer");
        return token;
    };

    function jwtDecoder(token, apiSecret){
        return promisify(jwt.verify)(token, apiSecret.API_SECRET);
       
    } 



};