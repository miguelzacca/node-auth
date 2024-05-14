"use strict";

import jwt from "jsonwebtoken";
import fs from "fs";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import { z } from "zod";
import xss from "xss";
import db from "../db/sequelize.js";
import User from "../models/User.js";
import config from "./config.js";

const app = express();

app.use(express.json());
app.use(cors(config.cors));

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome!" });
});

const inputDataSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  email: z.string().max(100).email().optional(),
  cpf: z.string().min(11).max(11).optional(),
  passwd: z.string().min(6).max(16).optional(),
});

/**
 * @param {object} input
 * @example
 * const inputValidated = validateInput(input)
 * @returns {object}
 * @throws {object}
 */
const validateInput = (input) => {
  try {
    return inputDataSchema.parse(input);
  } catch (err) {
    throw { zod: err };
  }
};

/**
 * @param {object} field
 * @param {boolean} restrict
 * @example
 * const user = await findUserByField({ name: "example" })
 * @returns {Promise<Model | null>}
 */
const findUserByField = async (field, restrict = false) => {
  const key = Object.keys(field)[0];
  const value = field[key];

  const attributes = restrict ? { exclude: ["cpf", "passwd"] } : null;

  return await User.findOne({ where: { [key]: value }, attributes });
};

/**
 * @param {object} input
 * @example
 * const sanitizedInput = sanitizeInput(input)
 * @returns {object}
 */
const sanitizeInput = (input) => {
  const sanitizedData = {};
  for (const key of Object.keys(input)) {
    sanitizedData[key] = xss(input[key]);
  }
  return sanitizedData;
};

app.post("/auth/register", async (req, res) => {
  try {
    const sanitizedInput = sanitizeInput(req.body);
    const { name, email, cpf, passwd } = validateInput(sanitizedInput);

    const emailExists = await findUserByField({ email });

    if (emailExists) {
      return res.status(409).json({ msg: "This email already exists." });
    }

    const cpfExists = await findUserByField({ cpf });

    if (cpfExists) {
      return res.status(409).json({ msg: "This CPF already exists." });
    }

    const salt = await bcrypt.genSalt(12);
    const passwdHash = await bcrypt.hash(passwd, salt);

    await User.create({
      name,
      email,
      cpf,
      passwd: passwdHash,
    });

    res.status(201).json({ msg: "User created successfully." });
  } catch (err) {
    if (err.zod) {
      return res.status(422).json(err);
    }
    console.error(err);
    res.status(500).json({ msg: "A server occurred error. Please try later." });
  }
});

app.post("/auth/login", async (req, res) => {
  const sanitizedInput = sanitizeInput(req.body);
  const { email, cpf, passwd } = sanitizedInput;

  try {
    const user = await findUserByField({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const checkPasswd = await bcrypt.compare(passwd, user.passwd);
    const checkCpf = cpf === user.cpf;

    if (!checkPasswd || !checkCpf) {
      return res.status(422).json({ msg: "Incorrect cpf or password." });
    }

    const secret = config.env.SECRET;

    const token = jwt.sign({ id: user.id }, secret);

    res
      .status(200)
      .json({ msg: "Authentication successful.", token, id: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "A server occurred error. Please try later." });
  }
});

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @example
 * app.get("/example", checkToken, (req, res) => {
 *   ...
 * })
 * @returns {NextFunction | null}
 */
const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ msg: "Access denied." });
  }

  try {
    const secret = config.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Unauthorized" });
  }
};

app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  try {
    const user = await findUserByField({ id }, true);

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const html = fs.readFileSync("./view/home.html", "utf-8", (err, data) => {
      if (err) {
        throw err;
      }
      return data;
    });

    res.status(200).json({ user, html });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "A server occurred error. Please try later." });
  }
});

/**
 * @param {Model} user
 * @param {object} field
 * @example
 * updateUserField(user, { name: "example" })
 * @returns {Promise<Model>}
 */
const updateUserField = async (user, field) => {
  const key = Object.keys(field)[0];
  const value = field[key];

  if (key !== "passwd") {
    user[key] = value;
    return user;
  }

  const salt = await bcrypt.genSalt(12);
  user[key] = await bcrypt.hash(value, salt);

  return user;
};

app.put("/user/update/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  try {
    const sanitizedInput = sanitizeInput(req.body);
    const input = validateInput(sanitizedInput);

    let user = await findUserByField({ id });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    for (const key in input) {
      user = await updateUserField(user, { [key]: input[key] });
    }

    await user.save();

    res.status(200).json({ msg: "User updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "A server occurred error. Please try later." });
  }
});

app.delete("/user/delete/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  try {
    const user = await findUserByField({ id });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    await user.destroy();

    res.status(200).json({ msg: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "A server occurred error. Please try later." });
  }
});

db.sync()
  .then(() => {
    const PORT = config.env.PORT;
    app.listen(PORT, () => {
      console.log(`\nListen... :${PORT}`);
    });
  })
  .catch((err) => console.error(err));
