const exchangesService = require("../service/exchangesService");
const usersService = require("../service/usersService");

module.exports = {
  create: async (req, res) => {
    const decoded = req.headers.authorization;

    const user_id = decoded.id;

    const { book_id } = req.body;

    const newExchange = await exchangesService.create(user_id, book_id);

    return res.status(200).send(newExchange);
  },
  setStatus: async (req, res) => {
    const decoded = req.headers.authorization;

    const user_id = decoded.id;

    const { id } = req.params;

    await exchangesService.setStatus(id, user_id);

    const exchange = await exchangesService.getExchange(id);

    const user_owner_id = exchange.books.users.id;

    await usersService.depositCredit(user_owner_id);

    await usersService.addCompletedExchange(user_owner_id);

    return res.status(200).send(exchange);
  },
  getExchange: async (req, res) => {
    const { id } = req.params;

    const exchange = await exchangesService.getExchange(id);

    return res.status(200).send(exchange);
  },
};
