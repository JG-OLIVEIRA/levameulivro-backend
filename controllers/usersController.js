const usersService = require("../service/usersService");

module.exports = {
  create: async (req, res) => {
    const { firstName, lastName, email, password, avatar, birthDate, zipCode } =
      req.body;

    const found = await usersService.find(email);

    if (found) {
      return res.status(401).send({ messege: "user already exist" });
    }

    const newUser = await usersService.create(
      firstName,
      lastName,
      email,
      password,
      avatar,
      birthDate,
      zipCode
    );

    return res.status(200).send(newUser);
  },
  read: async (req, res) => {
    const { email, password } = req.body;

    const found = await usersService.find(email);

    if (!found) {
      return res.status(401).send({ messege: "user is not exist" });
    }

    const userSession = await usersService.read(email, password);

    return res.status(200).send(userSession);
  },
  update: async (req, res) => {
    const { firstName, lastName, email, password, avatar, birthDate, zipCode } =
      req.body;

    const user = await usersService.update(
      firstName,
      lastName,
      email,
      password,
      avatar,
      birthDate,
      zipCode
    );

    return res.status(200).send(user);
  },
  destroy: async (req, res) => {
    const decoded = req.headers.authorization;

    const id = decoded.id;

    await usersService.destroy(id);

    return res.status(200).send({ messege: "user deleted" });
  },
};
