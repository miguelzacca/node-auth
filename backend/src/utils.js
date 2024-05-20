"use strict";

import bcrypt from "bcrypt";
import { z } from "zod";
import xss from "xss";
import User from "./models/User.js";

const inputDataSchema = z.object({
  name: z.string().min(3).max(100).optional(),
  email: z.string().max(100).email().optional(),
  cpf: z.string().min(11).max(11).optional(),
  passwd: z.string().min(6).max(16).optional(),
});

/**
 * @param {object} obj
 * @example
 * const { key, value } = objectKey(obj)
 * @returns {object}
 */
const objectKey = (obj) => {
  const key = Object.keys(obj)[0];
  return {
    key,
    value: obj[key],
  };
};

/**
 * @param {object} input
 * @example
 * const inputValidated = validateInput(input)
 * @returns {object}
 * @throws {object}
 */
export const validateInput = (input) => {
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
 * @returns {Promise<Model | void>}
 */
export const findUserByField = async (field, restrict = false) => {
  const { key, value } = objectKey(field);

  const attributes = restrict ? { exclude: ["cpf", "passwd"] } : null;

  return await User.findOne({ where: { [key]: value }, attributes });
};

/**
 * @param {object} input
 * @example
 * const sanitizedInput = sanitizeInput(input)
 * @returns {object}
 */
export const sanitizeInput = (input) => {
  const sanitizedData = {};
  for (const key of Object.keys(input)) {
    sanitizedData[key] = xss(input[key]);
  }
  return sanitizedData;
};

/**
 * @param {Model} user
 * @param {object} field
 * @example
 * updateUserField(user, { name: "example" })
 * @returns {Promise<Model>}
 */
export const updateUserField = async (user, field) => {
  const { key, value } = objectKey(field);

  if (key !== "passwd") {
    user[key] = value;
    return user;
  }

  const salt = await bcrypt.genSalt(12);
  user[key] = await bcrypt.hash(value, salt);

  return user;
};
