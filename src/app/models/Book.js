module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      name: DataTypes.STRING,
      author: DataTypes.STRING,
      isbn: DataTypes.BIGINT,
      thumbnail_url: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      description: DataTypes.TEXT
    },
  );

  Book.associate = function (models) {
    Book.hasOne(models.Swaps, {
      foreignKey: "book_id",
      as: "swaps",
    });
    Book.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "users",
    });
  };

  return Book;
};
