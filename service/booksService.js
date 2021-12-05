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
