module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
      },
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      completeExchanges: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      credit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "users",
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Book, {
      foreignKey: "user_id",
      as: "books",
    });
    User.hasMany(models.Exchange, {
      foreignKey: "user_id",
      as: "exchanges",
    });
  };

  return User;
};
