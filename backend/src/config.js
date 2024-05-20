"use strict";

import dotenv from "dotenv";

dotenv.config();

const { NODE_ENV, PORT, HOST, DB_NAME, DB_USER, DB_PASS, AUTH_DURATION_DAYS, SECRET } = process.env;

export default {
  env: {
    NODE_ENV,
    PORT,
    HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    SECRET,
  },

  cors: {
    origin: ["https://definitivelogin.netlify.app"],
    // origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },

  cookie: {
    httpOnly: true,
    secure: NODE_ENV === "production",
    maxAge: AUTH_DURATION_DAYS * 24 * 60 * 60 * 1000,
    sameSite: "None",
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
