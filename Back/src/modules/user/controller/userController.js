import UserService from "../service/UserService.js";

class UserController {
    async getAccessToken(req, res){
        let accessToken = await UserService.getAccessToken(req);
        return res.status(accessToken.status).json(accessToken);
    };

    async createUser(req,res){
        let user = await UserService.createUser(req);
        return res.status(user.status).json(user);
    }

    async findUserByEmail(req, res){
        let user = await UserService.findUserByEmail(req);
        return res.status(user.status).json(user);
    };
};

export default new UserController();