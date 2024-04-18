import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPasswd = process.env.DB_PASS;

const sequelize = new Sequelize("database", dbUser, dbPasswd, {
  host: "127.0.0.1",
  dialect: "mysql",
});

export default sequelize;
