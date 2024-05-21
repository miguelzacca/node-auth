"use strict";

import express from "express";
import { getUser, putUser, deleteUser } from "../controllers/userControllers.js";
import { checkToken } from "../middleware/checkToken.js";

const router = express.Router();

router.get("/", checkToken, getUser);

router.put("/update", checkToken, putUser);

router.delete("/delete", checkToken, deleteUser);

export default router;
