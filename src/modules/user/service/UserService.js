import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserRepository from "../repository/UserRepository.js";
import Exception from "../../../constants/Exception.js";
import * as httpStatus from "../../../constants/httpStatus.js";
import * as secrets from "../../../constants/secrets.js";

class UserService {
    async createUser(req) {
        try {
            const {
                name,
                email,
                password
            } = req.body
            let passwordHash = await this.#convertPasswordToPasswordHash(password)

            let user = await UserRepository.createUser({
                name,
                email,
                password: passwordHash,
            });
            delete user.dataValues.password

            return {
                status: httpStatus.SUCESS,
                user: user.dataValues
            }
        } catch (error) {
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }
    async #convertPasswordToPasswordHash(password) {
        return bcrypt.hash(password, 10)
    }

    async findUserByEmail(req) {
        try {
            const {
                email
            } = req.params;
            const {
                authenticatedUser
            } = req;
            this.#validateRequestData(email);
            let user = await this.#getUserByEmail(email)
            this.#validateUserNotFound(user);
            this.#validateAuthenticatedUser(user, authenticatedUser);
            return {
                status: httpStatus.SUCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            };
        } catch (error) {
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        };
    };

    #validateRequestData(email) {
        const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)

        if (!email) {
            throw new Exception(httpStatus.BAD_REQUEST, "User email was not informed. ");
        };
        if (!emailRegex.test(email)) {
            throw new Exception(httpStatus.BAD_REQUEST, "Email was not found.");
        }
    };
    async #getUserByEmail(email) {
        return await UserRepository.findByEmail(email);
    }

    #validateUserNotFound(user) {
        if (!user) {
            throw new Exception(httpStatus.BAD_REQUEST, "User was not found.");
        };
    };

    #validateAuthenticatedUser(user, authUser) {
        if (!authUser || user.id !== authUser.id) {
            throw new Exception(httpStatus.FORBIDDEN, "You cannot see this user data.");
        };
    };

    async getAccessToken(req) {
        try {
            const {
                email,
                password
            } = req.body;
            this.#validateRequestData(email);
            this.#validateRequestBody(email, password);
            let user = await this.#getUserByEmail(email)
            this.#validateUserNotFound(user);
            await this.#validatePassword(password.toString(), user.password);
            const authUser = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            const accessToken = jwt.sign({
                authUser
            }, secrets.API_SECRET, {
                expiresIn: "1d"
            });
            return {
                status: httpStatus.SUCESS,
                accessToken: "Bearer " + accessToken,
            };
        } catch (error) {
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        };
    };

    #validateRequestBody(email, password) {
        if (!email || !password) {
            throw new Exception(httpStatus.UNAUTHORIZED, "Email and password must be informed");
        };
    };

    async #validatePassword(password, hashPassword) {
        if (!await bcrypt.compare(password, hashPassword)) {
            throw new Exception(httpStatus.UNAUTHORIZED, "Password doesn't match.");
        };
    };

    async updateUserByEmail(req) {
        try {
            let { authenticatedUser } = req;
            let userChanges = req.body
            let attributesToChange = Object.keys(userChanges)
            let { dataValues: user } = await this.#getUserByEmail(authenticatedUser.email)

            for (let attribute of attributesToChange) {
                if (attribute == "password") {
                    user[attribute] = await this.#convertPasswordToPasswordHash(userChanges[attribute])
                } else {
                    user[attribute] = userChanges[attribute];
                }
            }
            let [{ dataValues: updatedUser }] = await UserRepository.updateUserByEmail(user)
            delete updatedUser.password;
            return {
                status: httpStatus.SUCESS,
                user: updatedUser,
            };

        } catch (error) {
            console.log(error.message)
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        }
    }

    async deleteUserByEmail(req) {
        try {
            const {
                authenticatedUser
            } = req;
            let deletionstatus = await UserRepository.dropUser(authenticatedUser.email)
            switch (deletionstatus) {
                case 0:
                    return {
                        status: httpStatus.BAD_REQUEST,
                        message: 'User does not exist'
                    };
                case 1:
                    return {
                        status: httpStatus.SUCESS,
                        message: 'Successful Deleted User'
                    };


            }

        } catch (error) {
            console.log(error)
            return {
                status: error.status ? error.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message,
            };
        };
    }
};

export default new UserService();