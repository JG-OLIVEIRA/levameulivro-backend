module.exports = (sequelize, DataTypes) => {
  const Swaps = sequelize.define(
    "Swaps",
    {
      user_id: DataTypes.INTEGER,
      book_id: DataTypes.INTEGER,
      accepted: DataTypes.BOOLEAN,
      completed: DataTypes.BOOLEAN
    },
  );

  Swaps.associate = function (models) {
    Swaps.belongsTo(models.Book, {
      foreignKey: "book_id",
      as: "books",
    });
    Swaps.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "users",
    });
  };

  return Swaps;
};
