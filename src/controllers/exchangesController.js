const exchangesService = require("../service/exchangesService");
const usersService = require("../service/usersService");
const booksService = require("../service/booksService");

module.exports = {
  create: async (req, res) => {
    const book_id = req.params.id;
    const user_id = req.headers.authorization.id;

    const { dataValues } = await booksService.findById(book_id);

    const owner_id = dataValues.user_id;

    if (user_id === owner_id) {
      return res
        .status(401)
        .send({ status: 401, messege: "Você não pode solicitar esse livro" });
    }

    const wasFound = await exchangesService.findByUserAndBookId(
      user_id,
      book_id
    );

    if (wasFound) {
      return res
        .status(401)
        .send({ status: 401, messege: "Você já solicitou este livro" });
    }

    const { credit } = await usersService.findById(user_id);

    if (credit === 0) {
      return res.status(401).send({
        status: 401,
        messege: "Você está sem creditos para fazer um pedido",
      });
    }

    await exchangesService.create(user_id, book_id);

    return res.status(200).send({ status: 200, messege: "Pedido realizado" });
  },
  setStatusById: async (req, res) => {
    const { id } = req.params;
    const { books } = await exchangesService.findById(id);
    const user_id = req.headers.authorization.id;

    const owner_id = books.users.dataValues.id;

    if (user_id === owner_id) {
      return res.status(401).send({
        status: 401,
        messege: "Usuário não autorizado a finalizar essa entrega",
      });
    }

    await exchangesService.setStatusById(id);

    await usersService.depositCreditById(owner_id);

    await usersService.addCompletedExchangeById(owner_id);

    await usersService.subtractCreditById(user_id);

    return res.status(200).send({ status: 200, messege: "Entrega concluída" });
  },
  setRequestById: async (req, res) => {
    const { id } = req.params;
    const { books } = await exchangesService.findById(id);
    const user_id = req.headers.authorization.id;

    const owner_id = books.users.dataValues.id;

    if (owner_id === user_id) {
      await exchangesService.setRequestById(id);

      return res.status(200).send({ status: 200, messege: "Pedido aceito" });
    }

    return res.status(401).send({
      status: 401,
      messege: "Usuário não autorizado a aceitar o pedido",
    });
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const exchange = await exchangesService.findById(id);

    return res.status(200).send({ status: 200, exchange: exchange });
  },
  getAll: async (req, res) => {
    const exchanges = await exchangesService.findAll();

    return res.status(200).send({ status: 200, exchanges: exchanges });
  },
  deleteById: async (req, res) => {
    const { id } = req.params;

    await exchangesService.destroyById(id);

    return res.status(200).send({ status: 200, messege: "Pedido deletado" });
  },
};
