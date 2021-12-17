module.exports = async (sequelize, DataTypes) => {
  const Exchange = sequelize.define(
    "Exchange",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
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
      tableName: "exchanges",
      timestamps: true,
    }
  );

  await Exchange.sync();

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
