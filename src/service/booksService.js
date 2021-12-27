const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
  create: async (name, author, isbn, thumbnail_url, user_id, description) => {
    return await db.Book.create({
      name,
      author,
      isbn,
      thumbnail_url,
      user_id,
      description,
    });
  },
  updateByUserId: async (id, name, author, isbn, user_id, description) => {
    return await db.Book.update(
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
  },
  findAll: async (limit, offset) => {
    return await db.Book.findAll({ limit, offset });
  },
  findById: async (id) => {
    return await db.Book.findByPk(id, {
      include: {
        model: db.User,
        as: "users",
        attributes: [
          "firstName",
          "lastName",
          "avatar",
          "zipCode",
          "completedExchanges",
          "credit",
        ],
      },
    });
  },
  findByNameOrAuthorOrISBN: async (name, author, isbn) => {
    const { count, rows } = await db.Book.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.startsWith]: name } },
          { author: { [Op.startsWith]: author } },
          { isbn: { [Op.startsWith]: isbn } },
        ],
      },
      attributes: [
        "id",
        "name",
        "author",
        "isbn",
        "thumbnail_url",
        "createdAt",
        "updatedAt",
      ],
      include: {
        model: db.User,
        as: "users",
        attributes: [
          "firstName",
          "lastName",
          "avatar",
          "zipCode",
          "completedExchanges",
          "credit",
        ],
      },
    });
    return { count: count, books: rows };
  },
  destroyByUserId: async (id, user_id) => {
    await db.Book.destroy({
      where: { id, user_id },
    });
  },
  destroyAllByUserId: async (user_id) => {
    return await db.Book.destroy({
      where: { user_id },
    });
  },
};
