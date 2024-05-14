"use strict";

import dotenv from "dotenv";

dotenv.config();

const { PORT, HOST, DB_NAME, DB_USER, DB_PASS, SECRET } = process.env;

export default {
  env: {
    PORT,
    HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    SECRET,
  },

  cors: {
    origin: ["https://definitivelogin.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
};
