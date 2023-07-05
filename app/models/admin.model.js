const Sequelize = require("sequelize");

module.exports = class Admin extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: {
            args: true,
            msg: "Email already in use!",
          },
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        type: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Admin",
        tableName: "admins",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
