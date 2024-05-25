"use strict";

import { DataTypes } from "sequelize";
import db from "@db/sequelize.ts";

const User = db.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },

    cpf: {
      type: DataTypes.STRING(11),
      unique: true,
      allowNull: false,
    },
    
    passwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default User;
