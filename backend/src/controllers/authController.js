"use strict";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import config from "../config.js";
import { sanitizeInput, validateInput, findUserByField } from "../utils.js";

export const register = async (req, res) => {
  try {
    const sanitizedInput = sanitizeInput(req.body);
    const { name, email, cpf, passwd } = validateInput(sanitizedInput);

    const emailExists = await findUserByField({ email });

    if (emailExists) {
      return res.status(409).json({ msg: config.msg.auth.emailExists });
    }

    const cpfExists = await findUserByField({ cpf });

    if (cpfExists) {
      return res.status(409).json({ msg: config.msg.auth.cpfExists });
    }

    const salt = await bcrypt.genSalt(12);
    const passwdHash = await bcrypt.hash(passwd, salt);

    await User.create({
      name,
      email,
      cpf,
      passwd: passwdHash,
    });

    res.status(201).json({ msg: config.msg.user.created });
  } catch (err) {
    if (err.zod) {
      return res.status(422).json(err);
    }
    console.error(err);
    res.status(500).json({ msg: config.msg.server.err });
  }
};

export const login = async (req, res) => {
  try {
    const sanitizedInput = sanitizeInput(req.body);
    const { email, cpf, passwd } = sanitizedInput;

    const user = await findUserByField({ email });

    if (!user) {
      return res.status(404).json({ msg: config.msg.user.notFound });
    }

    const checkPasswd = await bcrypt.compare(passwd, user.passwd);
    const checkCpf = cpf === user.cpf;

    if (!checkPasswd || !checkCpf) {
      return res.status(422).json({ msg: config.msg.auth.incorrect });
    }

    const secret = config.env.SECRET;

    const token = jwt.sign({ id: user.id }, secret);

    res.status(200).json({ msg: config.msg.auth.ok, token, id: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.msg.server.err });
  }
};
