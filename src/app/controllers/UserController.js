const { User } = require("../models");

class UserController {
  async store(req, res) {
    const { name, email, password, avatar, birthDate, zipCode } = req.body;

    if (await User.findOne({ where: { email } })) {
      return res.status(401).json({ message: "The user already exists." });
    }

    const user = await User.create({
      name: name,
      email: email,
      password: password,
      avatar: avatar,
      birth_date: birthDate,
      zip_code: zipCode,
      completed_exchanges: 0,
      credit: 1,
    });

    return res.status(201).json(
      { 
        status: 201,
        token: user.generateToken(),
        message: "The user was created."
      }
    );
  }
}

module.exports = new UserController();