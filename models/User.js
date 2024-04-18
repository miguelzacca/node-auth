import Sequelize from "sequelize";
import sequelize from "../db/sequelize.js";

const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(150),
    allowNull: false,
  },
  passwd: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default User;
