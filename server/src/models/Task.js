import { DataTypes } from "sequelize";
import db from "../config/db.js";

const sequelize = db.getSequelizeInstance();

const Task = sequelize.define(
  "Task",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "tasks",
  }
);

export default Task;
