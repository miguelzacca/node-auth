"use strict";

import { NextFunction, Response, Request } from "express";
import config from "@/config.ts";
import { jwtVerify } from "@/utils.ts";

/**
 * @example
 * app.get("/example", checkToken, (req, res) => {
 *   ...
 * })
 */
export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(403).json({ msg: config.msg.server.denied });
  }

  try {
    jwtVerify(token);
    next();
  } catch (err) {
    res.status(401).json({ msg: config.msg.server.invalidToken });
  }
};
