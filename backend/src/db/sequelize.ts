"use strict";

import { Sequelize } from "sequelize";
import config from "@/config.ts";

const { HOST, DB_NAME, DB_USER, DB_PASS } = config.env;

const db = new Sequelize(<string>DB_NAME, <string>DB_USER, <string>DB_PASS, {
  host: HOST,
  dialect: "mysql",
});

db.authenticate()
  .then(() => console.log(config.msg.auth.ok))
  .catch((err) => console.error(err));

export default db;
