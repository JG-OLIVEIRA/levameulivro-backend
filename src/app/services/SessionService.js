const { User } = require("../models");

class SessionService {
    async create(email, password) {
        const user = await User.findOne({ where: { email } });

        if (!await user.checkPassword(password)) {
            return false;
        }

        return user.generateToken();
    }
}

module.exports = new SessionService();