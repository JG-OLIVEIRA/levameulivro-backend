const { User } = require("../models");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "The user does not exist." });
    }

    if (!await user.checkPassword(password)){
      return res.status(401).json({ message: "The user's password is incorret." });
    }
    
    return res.status(200).json(
      {
        status: 200,
        token: user.generateToken(),
        message: "The user was authenticated"
      }
    );  
  }
}

module.exports = new SessionController();