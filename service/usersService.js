require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../database/models");

module.exports = {
  create: async (
    firstName,
    lastName,
    email,
    password,
    avatar,
    birthDate,
    zipCode
  ) => {
    const newUser = await db.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: await bcrypt.hash(password, 10),
      avatar: avatar,
      birthDate: birthDate,
      zipCode: zipCode,
      completedExchanges: 0,
      credit: 0,
    });

    return {
      token: jwt.sign(
        {
          id: newUser.id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "6h",
        }
      ),
      avatar: newUser.avatar,
    };
  },
  update: async (
    id,
    firstName,
    lastName,
    email,
    password,
    avatar,
    birthDate,
    zipCode
  ) => {
    await db.User.update(
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: await bcrypt.hash(password, 10),
        avatar: avatar,
        birthDate: birthDate,
        zipCode: zipCode,
      },
      {
        where: { id },
      }
    );

    return { messege: "dados atualizados" };
  },
  read: async (email, password) => {
    const user = await db.User.findOne({
      where: { email },
    });

    const isEqual = await bcrypt.compare(password, user.password);

    if (isEqual) {
      return {
        token: jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "6h",
          }
        ),
        avatar: user.avatar,
      };
    }

    return { error: "senha incorreta" };
  },
  destroy: async (id) => {
    await db.User.destroy({
      where: { id },
    });

    return { messege: "usuario deletado" };
  },
  find: async (email) => {
    const user = await db.User.findOne({
      where: { email },
    });

    if (user) {
      return true;
    }

    return false;
  },
  getAllBooks: async (id) => {
    return await db.User.findByPk(id, {
      attributes: [],
      include: "books",
    });
  },
  depositCredit: async (id) => {
    const user = await db.User.findOne({
      where: { id },
    });

    const currentCredit = user.credit + 1;

    return await db.User.update({ credit: currentCredit }, { where: { id } });
  },
  addCompletedExchange: async (id) => {
    const user = await db.User.findOne({
      where: { id },
    });

    const currentCompletedExchanges = user.completedExchanges + 1;

    return await db.User.update(
      {
        completedExchanges: currentCompletedExchanges,
      },
      { where: { id } }
    );
  },
};
