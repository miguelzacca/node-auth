import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { HOST, DB_NAME, DB_USER, DB_PASS } = process.env;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: HOST,
  dialect: "mysql2",
});

db.authenticate()
  .then(() => console.log("Authentication successful."))
  .catch((err) => console.error(err));

export default db;
