const booksService = require("../service/booksService");
const getBookCoverByISBN = require("../utils/apis/getBookCoverByISBN");

module.exports = {
  create: async (req, res) => {
    const { name, author, isbn, description } = req.body;

    const decoded = req.headers.authorization;

    const user_id = decoded.id;

    const thumbnail_url = await getBookCoverByISBN(isbn);

    console.log(thumbnail_url);

    const newBook = await booksService.create(
      name,
      author,
      isbn,
      thumbnail_url,
      user_id,
      description
    );

    return res.status(200).send(newBook);
  },
  updateByUserId: async (req, res) => {
    const { name, author, isbn, description } = req.body;

    const { id } = req.params;

    const decoded = req.headers.authorization;

    const user_id = decoded.id;

    const book = await booksService.updateByUserId(
      id,
      name,
      author,
      isbn,
      user_id,
      description
    );

    return res.status(200).send(book);
  },
  getAll: async (req, res) => {
    const books = await booksService.findAll();

    return res.status(200).send(books);
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const book = await booksService.findById(id);

    return res.status(200).send(book);
  },
  getByNameOrAuthorOrISBN: async (req, res) => {
    const { name, author, isbn } = req.query;

    const booksAndCount = await booksService.findByNameOrAuthorOrISBN(
      name,
      author,
      isbn
    );

    return res.status(200).send(booksAndCount);
  },
  deleteByUserId: async (req, res) => {
    const decoded = req.headers.authorization;
    const user_id = decoded.id;
    const { id } = req.params;

    await booksService.destroyByUserId(id, user_id);

    return res.status(200).send({ messege: "Livro deletado" });
  },
  deleteAllByUserId: async (req, res) => {
    const decoded = req.headers.authorization;
    const user_id = decoded.id;

    await booksService.destroyAllByUserId(user_id);

    return res.status(200).send({ messege: "Livros deletados" });
  },
};