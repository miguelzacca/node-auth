"use strict";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import xss from "xss";
import User from "./models/User.js";
import config from "./config.js";
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
const objectKey = (obj) => {
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
export const validateInput = (input) => {
    try {
        return inputDataSchema.parse(input);
    }
    catch (err) {
        throw { zod: err };
    }
};
/**
 * @async
 * @example
 * const user = await findUserByField({ name: "example" })
 */
export const findUserByField = async (field, restrict = false) => {
    const { key, value } = objectKey(field);
    let attributes = undefined;
    if (restrict) {
        attributes = { exclude: ["cpf", "passwd"] };
    }
    return await User.findOne({ where: { [key]: value }, attributes });
};
/**
 * @example
 * const sanitizedInput = sanitizeInput(input)
 */
export const sanitizeInput = (input) => {
    const sanitizedData = {};
    for (const key of Object.keys(input)) {
        sanitizedData[key] = xss(input[key]);
    }
    return sanitizedData;
};
/**
 * @example
 * updateUserField(user, { name: "example" })
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
/**
 * @example
 * const id = jwtVerify(token)
 * @throws
 */
export const jwtVerify = (token) => {
    try {
        const secret = config.env.SECRET;
        const payload = jwt.verify(token, secret);
        return payload.id;
    }
    catch (err) {
        throw err;
    }
};
