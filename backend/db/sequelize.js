"use strict";

import { Sequelize } from "sequelize";
import config from "../src/config.js";

const { HOST, DB_NAME, DB_USER, DB_PASS } = config.env;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: HOST,
  dialect: "mysql",
});

db.authenticate()
  .then(() => console.log("Authentication successful."))
  .catch((err) => console.error(err));

export default db;
