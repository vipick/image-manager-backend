const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "dev";
const config = require(__dirname + "/../configs/sequelize.config")[env];

const Admin = require("./admin.model");

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Admin = Admin;

Admin.init(sequelize);

module.exports = db;
