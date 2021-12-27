const booksService = require("../service/booksService");
const getPagination = require("../service/getPagination");
const getBookCoverByISBN = require("../utils/apis/getBookCoverByISBN");

module.exports = {
  create: async (req, res) => {
    const { name, author, isbn, description } = req.body;

    const decoded = req.headers.authorization;

    const user_id = decoded.id;

    const thumbnail_url = await getBookCoverByISBN(isbn);

    const newBook = await booksService.create(
      name,
      author,
      isbn,
      thumbnail_url,
      user_id,
      description
    );

    return res.status(200).send({ status: 200, newBook });
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

    return res.status(200).send({ status: 200, book });
  },
  getAll: async (req, res) => {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);

    const books = await booksService.findAll(limit, offset);

    return res.status(200).send({ status: 200, books });
  },
  getById: async (req, res) => {
    const { id } = req.params;

    const book = await booksService.findById(id);

    return res.status(200).send({ status: 200, book });
  },
  getByNameOrAuthorOrISBN: async (req, res) => {
    const { name, author, isbn } = req.query;

    const { count, books } = await booksService.findByNameOrAuthorOrISBN(
      name,
      author,
      isbn
    );

    return res.status(200).send({ status: 200, count, books });
  },
  deleteByUserId: async (req, res) => {
    const decoded = req.headers.authorization;
    const user_id = decoded.id;
    const { id } = req.params;

    await booksService.destroyByUserId(id, user_id);

    return res.status(200).send({ status: 200, messege: "Livro deletado" });
  },
  deleteAllByUserId: async (req, res) => {
    const decoded = req.headers.authorization;
    const user_id = decoded.id;

    await booksService.destroyAllByUserId(user_id);

    return res.status(200).send({ status: 200, messege: "Livros deletados" });
  },
};
