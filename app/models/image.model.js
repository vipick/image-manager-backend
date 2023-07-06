const Sequelize = require("sequelize");

module.exports = class Image extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        imageURL: {
          type: Sequelize.STRING(300),
          allowNull: true,
        },
        fileSize: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
      },
      {
        sequelize,
        underscored: false,
        modelName: "Image",
        tableName: "images",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
