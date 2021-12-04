const booksService = require("../service/booksService");
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

    const { error } = userSession;

    if (error) {
      return res.status(401).send(userSession);
    }

    return res.status(200).send(userSession);
  },
  update: async (req, res) => {
    const { firstName, lastName, email, password, avatar, birthDate, zipCode } =
      req.body;

    const decoded = req.headers.authorization;

    const { id } = decoded;

    const user = await usersService.update(
      id,
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

    const { id } = decoded;

    await booksService.destroyAllByUserId(id);

    const user = await usersService.destroy(id);

    return res.status(200).send(user);
  },
};
