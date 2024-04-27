import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: HOST,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Authentication success."))
  .catch((err) => console.error(err));

export default sequelize;
