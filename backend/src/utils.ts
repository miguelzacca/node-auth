"use strict";

import bcrypt from "bcrypt";
import { z } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import xss from "xss";
import User from "@models/User.ts";
import config from "@/config.ts"
import { Obj, UserModel } from "@types";
import { FindAttributeOptions } from "sequelize";

const inputDataSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  email: z.string().max(100).email().optional(),
  cpf: z.string().min(11).max(11).optional(),
  passwd: z.string().min(6).max(16).optional(),
});

/**
 * @example
 * const { key, value } = objectKey(obj)
 */
const objectKey = (obj: Obj) => {
  const key = Object.keys(obj)[0];
  return {
    key,
    value: obj[key],
  };
};

/**
 * @example
 * const inputValidated = validateInput(input)
 * @throws
 */
export const validateInput = (input: object) => {
  try {
    return inputDataSchema.parse(input);
  } catch (err) {
    throw { zod: err };
  }
};

/**
 * @async
 * @example
 * const user = await findUserByField({ name: "example" })
 */
export const findUserByField = async (field: Obj, restrict = false) => {
  const { key, value } = objectKey(field);

  let attributes: FindAttributeOptions | undefined = undefined;
  if (restrict) {
    attributes = { exclude: ["cpf", "passwd"] };
  }

  return await User.findOne({ where: { [key]: value }, attributes });
};

/**
 * @example
 * const sanitizedInput = sanitizeInput(input)
 */
export const sanitizeInput = (input: Obj) => {
  const sanitizedData: Obj = {};
  for (const key of Object.keys(input)) {
    sanitizedData[key] = xss(input[key]);
  }
  return sanitizedData;
};

/**
 * @example
 * updateUserField(user, { name: "example" })
 */
export const updateUserField = async (user: UserModel, field: Obj) => {
  const { key, value } = objectKey(field);

  if (key !== "passwd") {
    user[key] = value;
    return user;
  }

  const salt = await bcrypt.genSalt(12);
  user[key] = await bcrypt.hash(value, salt);

  return user;
};

/**
 * @example
 * const id = jwtVerify(token)
 * @throws
 */
export const jwtVerify = (token: string) => {
  try {
    const secret = <string>config.env.SECRET;
    const payload = <JwtPayload>jwt.verify(token, secret);
    return payload.id;
  } catch (err) {
    throw err;
  }
};
