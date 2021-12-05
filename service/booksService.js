const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
  create: async (name, author, isbn, user_id, description) => {
    const newBook = await db.Book.create({
      name,
      author,
      isbn,
      user_id,
      description,
    });

    return newBook;
  },
  updateById: async (id, name, author, isbn, user_id, description) => {
    await db.Book.update(
      {
        name,
        author,
        isbn,
        description,
      },
      {
        where: { id, user_id },
      }
    );

    return { messege: "book updated" };
  },
  readAll: async () => {
    const books = await db.Book.findAll();

    return books;
  },
  getById: async (id) => {
    const book = await db.Book.findByPk(id);

    return book;
  },
  getByNameOrAuthorOrISBN: async (name, author, isbn) => {
    const { count, rows } = await db.Book.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.startsWith]: name } },
          { author: { [Op.startsWith]: author } },
          { isbn: { [Op.startsWith]: isbn } },
        ],
      },
      attributes: ["id", "name", "author"],
      include: {
        model: db.User,
        as: "users",
        attributes: ["firstName", "completeExchanges", "zipCode"],
      },
    });

    return { count: count, books: rows };
  },
  destroyById: async (id, user_id) => {
    await db.Book.destroy({
      where: { id, user_id },
    });

    return { messege: "book deleted" };
  },
  destroyAllByUserId: async (user_id) => {
    await db.Book.destroy({
      where: { user_id },
    });

    return { messege: "all books deleted" };
  },
};
