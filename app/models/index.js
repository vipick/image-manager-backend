const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "dev";
const config = require(__dirname + "/../configs/sequelize.config")[env];

const Admin = require("./admin.model");
const Image = require("./image.model");

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Admin = Admin;
db.Image = Image;

Admin.init(sequelize);
Image.init(sequelize);

module.exports = db;
