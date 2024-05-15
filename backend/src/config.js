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

  msg: {
    auth: {
      ok: "Authentication successful.",
      incorrect: "Incorrect cpf or password.",
      emailExists: "This email already exists.",
      cpfExists: "This CPF already exists.",
    },

    user: {
      notFound: "User not found.",
      created: "User created successfully.",
      deleted: "User deleted successfully.",
      updated: "User updated successfully.",
    },

    server: {
      great: "Welcome!",
      err: "A server occurred error. Please try later.",
      denied: "Access denied.",
      unauthorized: "Unauthorized.",
    },
  },
};
