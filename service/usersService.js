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
    return await db.User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      avatar: avatar,
      birthDate: birthDate,
      zipCode: zipCode,
      completedExchanges: 0,
      credit: 1,
    });
  },
  updateById: async (
    id,
    firstName,
    lastName,
    email,
    password,
    avatar,
    birthDate,
    zipCode
  ) => {
    return await db.User.update(
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
  },
  findByEmail: async (email) => {
    return await db.User.findOne({
      where: { email },
    });
  },
  destroyById: async (id) => {
    return await db.User.destroy({
      where: { id },
    });
  },
  wasFoundByEmail: async (email) => {
    const user = await db.User.findOne({
      where: { email },
    });

    if (user) {
      return true;
    }

    return false;
  },
  findAll: async () => {
    return await db.User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "avatar",
        "birthDate",
        "zipCode",
      ],
    });
  },
  findById: async (id) => {
    return await db.User.findByPk(id, {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "avatar",
        "birthDate",
        "zipCode",
      ],
    });
  },
  findAllBooksByUserId: async (id) => {
    return await db.User.findByPk(id, {
      attributes: [],
      include: "books",
    });
  },
  findAllExchangesByUserId: async (id) => {
    return await db.User.findByPk(id, {
      attributes: [],
      include: "exchanges",
    });
  },
  depositCreditById: async (id) => {
    const user = await db.User.findOne({
      where: { id },
    });

    const currentCredit = user.credit + 1;

    return await db.User.update({ credit: currentCredit }, { where: { id } });
  },
  addCompletedExchangeById: async (id) => {
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
