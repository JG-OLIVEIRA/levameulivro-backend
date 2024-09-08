const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      avatar: DataTypes.STRING,
      birth_date: DataTypes.DATE,
      zip_code: DataTypes.INTEGER,
      credit: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
          }
        }
      }
    }
  );

  User.prototype.checkPassword = function (password) {
    return bcrypt.compare(password, this.password_hash);
  };

  User.prototype.generateToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_KEY, {
      expiresIn: '1h', // Token expira em 1 hora
    });
  };

  User.associate = function (models) {
    User.hasMany(models.Book, {
      foreignKey: "user_id",
      as: "books",
    });
  };

  return User;
};
