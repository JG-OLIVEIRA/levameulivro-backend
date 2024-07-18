const SessionService = require("../services/SessionService");
const UserService = require("../services/UserService");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    if (!await UserService.findByEmail(email)) {
      return res.status(404).json({ message: "The user does not exist." });
    }

    const token = await SessionService.create(email, password);

    if (!token) {
      return res.status(401).json({ message: "The user's password is incorret." });
    }
    return res.status(200).json({ status: 200, token: token, message: "The user was authenticated." });
  }
}

module.exports = new SessionController();