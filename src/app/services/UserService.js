const { User } = require("../models");

class UserService {
    async create(name, email, password, avatar, birth_date, zip_code) {
        const [completed_swaps, credit] = [0, 0]
        return await User.create({ name, email, password, avatar, birth_date, zip_code, completed_swaps, credit });
    }
    async findByEmail(email) {
        return await User.findOne({ where: { email } })
    }
}

module.exports = new UserService();