const exchangesService = require("../service/exchangesService");
const usersService = require("../service/usersService");

module.exports = {
  create: async (req, res) => {
    const book_id = req.params.id;
    const user_id = req.headers.authorization.id;

    const { credit } = await usersService.findById(user_id);

    if (credit === 0) {
      return res
        .status(401)
        .send({ messege: "Você está sem creditos para fazer um pedido" });
    }

    await exchangesService.create(user_id, book_id);

    return res.status(200).send({ messege: "Pedido realizado" });
  },
  setStatusById: async (req, res) => {
    const decoded = req.headers.authorization.id;
    const { id } = req.params;
    const { user_id, books } = await exchangesService.findById(id);

    if (user_id !== decoded || books.users.dataValues.id === decoded) {
      return res
        .status(401)
        .send({ messege: "Usuário não autorizado a finalizar essa entrega" });
    }

    await exchangesService.setStatusById(id);

    await usersService.depositCreditById(books.users.dataValues.id);

    await usersService.addCompletedExchangeById(books.users.dataValues.id);

    await usersService.subtractCreditById(decoded);

    return res.status(200).send({ messege: "Entrega concluída" });
  },
  setRequestById: async (req, res) => {
    const { id } = req.params;
    const { books } = await exchangesService.findById(id);
    const decoded = req.headers.authorization.id;

    if (books.users.dataValues.id === decoded) {
      await exchangesService.setRequestById(id);

      return res.status(200).send({ messege: "Pedido aceito" });
    }

    return res
      .status(401)
      .send({ messege: "Usuário não autorizado a aceitar o pedido" });
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const exchange = await exchangesService.findById(id);

    return res.status(200).send(exchange);
  },
  getAll: async (req, res) => {
    const exchanges = await exchangesService.findAll();

    return res.status(200).send(exchanges);
  },
  deleteById: async (req, res) => {
    const { id } = req.params;

    await exchangesService.destroyById(id);

    return res.status(200).send({ messege: "Pedido deletado" });
  },
};
