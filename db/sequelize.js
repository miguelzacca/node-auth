import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPasswd = process.env.DB_PASS;

const sequelize = new Sequelize(dbName, dbUser, dbPasswd, {
  host: process.env.HOST,
  dialect: "mysql",
});

sequelize.authenticate().catch((err) => {
  console.error(err);
});

export default sequelize;
