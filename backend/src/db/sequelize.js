"use strict";

import { Sequelize } from "sequelize";
import config from "../config.js";

const { HOST, DB_NAME, DB_USER, DB_PASS } = config.env;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: HOST,
  dialect: "mysql",
});

db.authenticate()
  .then(() => console.log(config.msg.auth.ok))
  .catch((err) => console.error(err));

export default db;
