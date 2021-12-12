const db = require("../database/models");

module.exports = {
  create: async (user_id, book_id) => {
    return await db.Exchange.create({
      user_id: user_id,
      book_id: book_id,
      accepted: false,
      completed: false,
    });
  },
  setRequestById: async (id) => {
    return await db.Exchange.update({ accepted: true }, { where: { id } });
  },
  setStatusById: async (id) => {
    return await db.Exchange.update({ completed: true }, { where: { id } });
  },
  findById: async (id) => {
    return await db.Exchange.findByPk(id, {
      attributes: [
        "id",
        "user_id",
        "book_id",
        "accepted",
        "completed",
        "createdAt",
        "updatedAt",
      ],
      include: {
        model: db.Book,
        as: "books",
        attributes: ["id", "name", "author", "createdAt", "updatedAt"],
        include: {
          model: db.User,
          as: "users",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "avatar",
            "birthDate",
            "zipCode",
          ],
        },
      },
    });
  },
  destroyById: async (id) => {
    return await db.Exchange.destroy({ where: { id } });
  },
  findAll: async () => {
    return await db.Exchange.findAll({
      attributes: [
        "id",
        "user_id",
        "book_id",
        "accepted",
        "completed",
        "createdAt",
        "updatedAt",
      ],
      include: {
        model: db.Book,
        as: "books",
        attributes: ["id", "name", "author", "createdAt", "updatedAt"],
        include: {
          model: db.User,
          as: "users",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "avatar",
            "birthDate",
            "zipCode",
          ],
        },
      },
    });
  },
};
