"use strict";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "@/config.ts";
import authRoutes from "@routes/authRoutes.ts";
import userRoutes from "@routes/userRoutes.ts";
import db from "@db/sequelize.ts";

const app = express();

app.use(express.json());

app.use(cors(config.cors));

app.use(cookieParser());

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: config.msg.server.great });
});

db.sync()
  .then(() => {
    const PORT = config.env.PORT;
    app.listen(PORT, () => {
      console.log(`\nRunning... :${PORT}`);
    });
  })
  .catch((err) => console.error(err));
