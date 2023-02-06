import bcrypt from "bcrypt";
import User from "../model/User.js";

class UserRepository {
    async createUser({name, email, password}) {
        await User.sync({alter: true})
        return User.create({
            name,
            email,
            password
        });
    };

    findByEmail(email) {
        return User.findOne({
            where: { email }
        });
    };

    updateUserByEmail(userToUpdate){
        return User.upsert(userToUpdate);
    };

    dropUser(email){
        return User.destroy({
            where: {email}
        });
    };

};

export default new UserRepository();