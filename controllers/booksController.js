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
  update: async (req, res) => {
    const { name, author, isbn, description } = req.body;

    const decoded = req.headers.authorization;

    const user_id = decoded.id;

    const book = await booksService.update(
      name,
      author,
      isbn,
      user_id,
      description
    );

    return res.status(200).send(book);
  },
  read: async (req, res) => {
    const decoded = req.headers.authorization;

    const user_id = decoded.id;

    const books = await booksService.read(user_id);

    return res.status(200).send(books);
  },
  destroy: async (req, res) => {
    const { name } = req.params;

    const decoded = req.headers.authorization;

    const id = await decoded.id;

    await usersService.destroy(id, name);

    return res.status(200).send({ messege: "book deleted" });
  },
};
