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

    return { messege: "user updated" };
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

    return { error: "incorrect password" };
  },
  destroy: async (id) => {
    await db.User.destroy({
      where: { id },
    });

    return { messege: "user deleted" };
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
};
