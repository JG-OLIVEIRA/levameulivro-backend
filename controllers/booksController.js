const booksService = require("../service/booksService");

module.exports = {
  create: async (req, res) => {
    const { name, author, isbn, description } = req.body;

    const decoded = req.headers.authorization;

    const user_id = decoded.id;

    const newBook = await booksService.create(
      name,
      author,
      isbn,
      user_id,
      description
    );

    return res.status(200).send(newBook);
  },
  updateById: async (req, res) => {
    const { name, author, isbn, description } = req.body;

    const { id } = req.params;

    const decoded = req.headers.authorization;

    const user_id = decoded.id;

    const book = await booksService.updateById(
      id,
      name,
      author,
      isbn,
      user_id,
      description
    );

    return res.status(200).send(book);
  },
  readAll: async (req, res) => {
    const books = await booksService.readAll();

    return res.status(200).send(books);
  },
  destroyById: async (req, res) => {
    const decoded = req.headers.authorization;

    const { id } = req.params;

    const user_id = decoded.id;

    const book = await booksService.destroyById(id, user_id);

    return res.status(200).send(book);
  },
};
