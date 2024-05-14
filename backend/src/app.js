"use strict";

import express from "express";
import cors from "cors";
import config from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import db from "./db.js";

const app = express();

app.use(express.json());

app.use(cors(config.cors));

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ msg: config.msg.server.welcome });
});

db.sync()
  .then(() => {
    const PORT = config.env.PORT;
    app.listen(PORT, () => {
      console.log(`\nListen... :${PORT}`);
    });
  })
  .catch((err) => console.error(err));
