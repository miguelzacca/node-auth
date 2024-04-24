import Sequelize from "sequelize";
import sequelize from "../db/sequelize.js";

const User = sequelize.define("user", {
  id: {
    type: Sequelize.STRING(100),
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(150),
    allowNull: false,
    unique: true,
  },
  passwd: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

sequelize.sync().catch((err) => {
  console.error(err);
});

export default User;
