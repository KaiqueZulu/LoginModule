import bcrypt from "bcrypt";
import User from "../model/User.js";

class UserRepository {
    async createUser(name, email, password) {
        let hashPassword = await bcrypt.hash(password, 10);
        return User.create({
            name: name,
            email: email,
            password: hashPassword
        });
    };

    findByEmail(email) {
        return User.findOne({
            where: { email }
        });
    };

    updateUser(userToUpdate){
        return User.upsert(userToUpdate);
    };

    dropUser(email){
        return User.destroy({
            where: {email}
        });
    };

};

export default new UserRepository();