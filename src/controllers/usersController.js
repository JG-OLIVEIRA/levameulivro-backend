const usersService = require("../service/usersService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getPagination = require("../service/getPagination");

module.exports = {
  createAccount: async (req, res) => {
    const { firstName, lastName, email, password, avatar, birthDate, zipCode } =
      req.body;

    const wasFound = await usersService.wasFoundByEmail(email);

    if (wasFound) {
      return res
        .status(401)
        .send({ status: 401, messege: "A conta já existe" });
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

    const userSession = {
      status: 200,
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
      return res
        .status(401)
        .send({ staus: 401, messege: "Conta não encontrada" });
    }

    const user = await usersService.findByEmail(email);

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      return res.status(401).send({ status: 401, error: "Senha incorreta" });
    }

    const userSession = {
      status: 200,
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

    return res.status(200).send({ status: 200, messege: "Dados atualizados" });
  },
  deleteAccount: async (req, res) => {
    const decoded = req.headers.authorization;

    const { id } = decoded;

    await usersService.destroyById(id);

    return res.status(200).send({ status: 200, messege: "Conta deletada" });
  },
  getAll: async (req, res) => {
    const users = await usersService.findAll();

    return res.status(200).send({ status: 200, users: users });
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const user = await usersService.findById(id);

    return res.status(200).send({ status: 200, user: user });
  },
  getMyBooks: async (req, res) => {
    const decoded = req.headers.authorization;

    const { page, limit } = req.query;

    const { id } = decoded;

    const { offset } = getPagination(page, limit);

    const myBooks = await usersService.findAllBooksByUserId(id, limit, offset);

    return res.status(200).send({ status: 200, your_books: myBooks });
  },
  getMyExchanges: async (req, res) => {
    const decoded = req.headers.authorization;

    const { id } = decoded;

    const myExchanges = await usersService.findAllExchangesByUserId(id);

    return res.status(200).send({ status: 200, your_requests: myExchanges });
  },
};
