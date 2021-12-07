const db = require("../database/models");

module.exports = {
  create: async (user_id, book_id) => {
    const newExchange = await db.Exchange.create({
      user_id: user_id,
      book_id: book_id,
      completed: false,
    });

    const { id } = newExchange;

    const infoExchange = await db.Exchange.findByPk(id, {
      attributes: ["id", "completed", "createdAt", "updatedAt"],
      include: {
        model: db.User,
        as: "users",
        attributes: ["firstName", "lastName", "email"],
      },
      include: {
        model: db.Book,
        as: "books",
        attributes: ["name", "author", "isbn", "description"],
      },
    });

    return infoExchange;
  },
  setStatus: async (id, user_id) => {
    return await db.Exchange.update(
      { completed: true },
      { where: { id, user_id } }
    );
  },
  getExchange: async (id) => {
    const exchange = await db.Exchange.findByPk(id, {
      attributes: ["id", "completed", "createdAt", "updatedAt"],
      include: {
        model: db.User,
        as: "users",
        attributes: ["firstName", "lastName", "email"],
      },
      include: {
        model: db.Book,
        as: "books",
        attributes: ["name", "author", "isbn", "description"],
        include: {
          model: db.User,
          as: "users",
          attributes: ["id"],
        },
      },
    });

    return exchange;
  },
};
