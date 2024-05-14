"use strict";

import express from "express";
import { getUser, putUser, deleteUser } from "../controllers/userController.js";
import { checkToken } from "../middleware/checkToken.js";

const router = express.Router();

router.get("/:id", checkToken, getUser);

router.put("/update/:id", checkToken, putUser);

router.delete("/delete/:id", checkToken, deleteUser);

export default router;
