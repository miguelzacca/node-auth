import express from "express";
import dotenv from "dotenv";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sequelize from "../db/sequelize.js";
import { z } from "zod";
import cors from "cors";
import fs from "fs";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome!" });
});

const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Access denied." });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token." });
  }
};

app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({
    where: { id: id },
    attributes: { exclude: ["passwd", "cpf"] },
  });

  if (!user) {
    return res.status(404).json({ msg: "User not found." });
  }

  const html = fs.readFileSync("./view/home.html", "utf-8", (err, data) => {
    if (err) {
      return console.error(err);
    }
    return data;
  });

  res.status(200).json({ html, user });
});

const userDataSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email().max(150),
  cpf: z.string().min(11).max(11),
  passwd: z.string().min(6).max(16),
});

const validateData = (data) => {
  try {
    return userDataSchema.parse(data);
  } catch (err) {
    err = [err, true];
    throw err;
  }
};

app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, cpf, passwd } = validateData(req.body);

    const userExists = await User.findOne({ where: { email: email } });

    if (userExists) {
      return res.status(422).json({ msg: "Please use another email." });
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
    if (err[1]) {
      return res.status(400).json({ msg: err[0] });
    }
    console.error(err);
    res
      .status(500)
      .json({ msg: "A server error occurred, please try again later." });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, cpf, passwd } = req.body;

  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    return res.status(404).json({ msg: "User not found." });
  }

  const checkPasswd = await bcrypt.compare(passwd, user.passwd);
  const checkCpf = cpf === user.cpf;

  if (!checkPasswd) {
    return res.status(422).json({ msg: "Invalid password." });
  }

  if (!checkCpf) {
    return res.status(422).json({ msg: "Invalid CPF." });
  }

  try {
    const secret = process.env.SECRET;

    const token = jwt.sign(
      {
        id: user.id,
      },
      secret
    );

    res
      .status(200)
      .json({ msg: "Authentication success.", token, id: user.id });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ msg: "A server error occurred, please try again later." });
  }
});

app.delete("/user/delete/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    await user.destroy();

    res.status(200).json({ msg: "User deleted successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ msg: "A server error occurred, please try again later." });
  }
});

sequelize
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`\nListen... :${PORT}`);
    });
  })
  .catch((err) => console.error(err));
