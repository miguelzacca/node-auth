"use strict";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "@models/User.ts";
import config from "@/config.ts";
import { sanitizeInput, validateInput, findUserByField } from "@/utils.js";
import { InputData, UserModel } from "@types";

export const register = async (req: Request, res: Response) => {
  try {
    const sanitizedInput = sanitizeInput(req.body);
    const input: InputData = validateInput(sanitizedInput);
    const { name, email, cpf, passwd } = input;

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
  } catch (err: any) {
    if (err.zod) {
      return res.status(422).json(err);
    }
    console.error(err);
    res.status(500).json({ msg: config.msg.server.err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const sanitizedInput = sanitizeInput(req.body);
    const input: InputData = sanitizedInput;
    const { email, cpf, passwd } = input;

    const user: UserModel | null = await findUserByField({ email });

    if (!user) {
      return res.status(404).json({ msg: config.msg.user.notFound });
    }

    const checkPasswd = await bcrypt.compare(passwd, user.passwd);
    const checkCpf = cpf === user.cpf;

    if (!checkPasswd || !checkCpf) {
      return res.status(422).json({ msg: config.msg.auth.incorrect });
    }

    const secret = config.env.SECRET;

    const token = jwt.sign({ id: user.id }, <string>secret, {
      expiresIn: config.env.AUTH_DURATION_DAYS * 24 * 60 * 60,
    });

    res.cookie("token", token, <object>config.cookie);

    res.status(200).json({ msg: config.msg.auth.ok });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: config.msg.server.err });
  }
};
