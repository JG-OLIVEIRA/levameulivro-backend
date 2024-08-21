const { User } = require("../models");

class UserService {
    async create(name, email, password, avatar, birth_date, zip_code) {
        return User.create({
            name: name,
            email: email,
            password: password,
            avatar: avatar,
            birth_date: birth_date,
            zip_code: zip_code,
            credit: 1,
        });
    }
    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }
}

module.exports = new UserService();