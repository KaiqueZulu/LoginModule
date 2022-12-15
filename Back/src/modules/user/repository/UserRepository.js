import User from "../model/User.js";

class UserRepository {

    async findById(id) {
        
            return await User.findOne({
                where: {id}
            });
     
    };

    async findByEmail(email) {
        
            return await User.findOne({
                where: {email}
            });
       
    };
};

export default new UserRepository();