const UserService = require("../services/UserService");

class UserController {
  async store(req, res) {
    const { name, email, password, avatar, birth_date, zip_code } = req.body;

    let user = await UserService.findByEmail(email);

    if (user) {
      const isPasswordValid = await user.checkPassword(password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password." });
      }

    } else {
      user = await UserService.create(name, email, password, avatar, birth_date, zip_code);
      res.status(201);
    }

    return res.json({
      token: user.generateToken()
    });

  }
}

module.exports = new UserController();