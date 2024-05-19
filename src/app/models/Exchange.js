module.exports = (sequelize, DataTypes) => {
  const Exchange = sequelize.define(
    "Exchange",
    {
      user_id: DataTypes.INTEGER,
      book_id: DataTypes.INTEGER,
      accepted: DataTypes.BOOLEAN,
      completed: DataTypes.BOOLEAN
    },
  );

  Exchange.associate = function (models) {
    Exchange.belongsTo(models.Book, {
      foreignKey: "book_id",
      as: "books",
    });
    Exchange.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "users",
    });
  };

  return Exchange;
};
