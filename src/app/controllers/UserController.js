const UserService = require("../services/UserService");

class UserController {
  async store(req, res) {
    const { name, email, password, avatar, birthDate, zipCode } = req.body;

    if (await UserService.findByEmail(email)) {
      return res.status(401).json({ message: "The user already exists." });
    }

    const user = await UserService.create(name, email, password, avatar, birthDate, zipCode);

    return res.status(201).json(
      {
        status: 201,
        email: user.email,
        message: "The user was created."
      }
    );
  }
}

module.exports = new UserController();