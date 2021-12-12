const usersService = require("../service/usersService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  createAccount: async (req, res) => {
    const { firstName, lastName, email, password, avatar, birthDate, zipCode } =
      req.body;

    const newUser = await usersService.create(
      firstName,
      lastName,
      email,
      password,
      avatar,
      birthDate,
      zipCode
    );

    const userSession = {
      token: jwt.sign(
        {
          id: newUser.id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "6h",
        }
      ),
      avatar: newUser.avatar,
    };

    return res.status(200).send(userSession);
  },
  initSession: async (req, res) => {
    const { email, password } = req.body;

    const wasFound = await usersService.wasFoundByEmail(email);

    if (!wasFound) {
      return res.status(401).send({ messege: "Conta não encontrada" });
    }

    const user = await usersService.findByEmail(email);

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return res.status(401).send({ error: "Senha incorreta" });
    }

    const userSession = {
      token: jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "6h",
        }
      ),
      avatar: user.avatar,
    };

    return res.status(200).send(userSession);
  },
  updateAccount: async (req, res) => {
    const { firstName, lastName, email, password, avatar, birthDate, zipCode } =
      req.body;

    const decoded = req.headers.authorization;

    const { id } = decoded;

    await usersService.updateById(
      id,
      firstName,
      lastName,
      email,
      password,
      avatar,
      birthDate,
      zipCode
    );

    return res.status(200).send({ messege: "Dados atualizados" });
  },
  deleteAccount: async (req, res) => {
    const decoded = req.headers.authorization;

    const { id } = decoded;

    await usersService.destroyById(id);

    return res.status(200).send({ messege: "Conta deletada" });
  },
  getAll: async (req, res) => {
    const users = await usersService.findAll();

    return res.status(200).send(users);
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const user = await usersService.findById(id);

    return res.status(200).send(user);
  },
  getMyBooks: async (req, res) => {
    const decoded = req.headers.authorization;

    const { id } = decoded;

    const myBooks = await usersService.findAllBooksByUserId(id);

    return res.status(200).send(myBooks);
  },
  getMyExchanges: async (req, res) => {
    const decoded = req.headers.authorization;

    const { id } = decoded;

    const myExchanges = await usersService.findAllExchangesByUserId(id);

    return res.status(200).send(myExchanges);
  },
};
