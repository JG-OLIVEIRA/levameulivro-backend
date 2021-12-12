const exchangesService = require("../service/exchangesService");
const usersService = require("../service/usersService");

module.exports = {
  create: async (req, res) => {
    const book_id = req.params.id;
    const user_id = req.headers.authorization.id;

    await exchangesService.create(user_id, book_id);

    return res.status(200).send({ messege: "Pedido realizado" });
  },
  setStatusById: async (req, res) => {
    const decoded = req.headers.authorization.id;
    const { id } = req.params;
    const { user_id, book } = await exchangesService.findById(id);

    if (user_id !== decoded || book.users === decoded) {
      return res
        .status(401)
        .send({ messege: "Usuário não autorizado a finalizar essa entrega" });
    }

    await exchangesService.setStatusById(id);

    await usersService.depositCreditById(user_id);

    await usersService.addCompletedExchangeById(user_id);

    return res.status(200).send({ messege: "Entrega concluída" });
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
