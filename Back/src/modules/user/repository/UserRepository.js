import User from "../model/User.js";

class UserRepository {
    findByEmail(email) {
        return User.findOne({
            where: { email }
        });
    };
    
};

export default new UserRepository();