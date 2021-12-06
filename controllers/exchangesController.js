const exchangesService = require("../service/exchangesService");

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

    const exchange = await exchangesService.setStatus(id, user_id);

    return res.status(200).send(exchange);
  },
  getExchange: async (req, res) => {
    const { id } = req.params;

    const exchange = await exchangesService.getExchange(id);

    return res.status(200).send(exchange);
  },
};
