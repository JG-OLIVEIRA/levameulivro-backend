const { User } = require("../models");

class UserController {
  async store(req, res) {
    const { name, email, password, avatar, birth_date, zip_code } = req.body;

    let user = await User.findOne({ where: { email } });

    if (user) {
      const isPasswordValid = await user.checkPassword(password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
    } else {
      user = await User.create({
        name: name,
        email: email,
        password: password,
        avatar: avatar,
        birth_date: birth_date,
        zip_code: zip_code,
        completed_exchanges: 0,
        credit: 1,
      });

      res.status(201);
    }

    return res.json({
      token: user.generateToken()
    });
  }
}

module.exports = new UserController();