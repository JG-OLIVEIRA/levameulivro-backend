const db = require("../database/models");

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
    const newBook = await db.Book.update(
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

    return newBook;
  },
  readAllByUserId: async (user_id) => {
    const books = await db.Book.findAll({ where: user_id });

    return books;
  },
  destroyById: async (id) => {
    return await db.Book.destroy({
      where: { id },
    });
  },
  destroyAllByUserId: async (user_id) => {
    await db.Book.destroy({
      where: { user_id },
    });

    return { messege: "all books deleted" };
  },
};
