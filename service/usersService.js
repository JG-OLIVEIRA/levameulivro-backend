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
      password: bcrypt.hash(password, 10),
      avatar: avatar,
      birthDate: birthDate,
      zipCode: zipCode,
      completeExchanges: 0,
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
    firstName,
    lastName,
    email,
    password,
    avatar,
    birthDate,
    zipCode
  ) => {
    const user = await db.User.update({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: bcrypt.hash(password, 10),
      avatar: avatar,
      birthDate: birthDate,
      zipCode: zipCode,
    });

    return user;
  },
  read: async (email, password) => {
    const user = await db.Usuario.findOne({
      where: { email: email },
    });

    const isEqual = await bcrypt.compare(password, user.password);

    if (isEqual) {
      return {
        token: jwt.sign(
          {
            id: user.dataValues.id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "6h",
          }
        ),
        avatar: user.dataValues.avatar,
      };
    }
  },
  destroy: async (id) => {
    return await db.User.destroy({
      where: { id: id },
    });
  },
};
