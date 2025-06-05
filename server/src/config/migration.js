import db from "./db.js";
import User from "../models/User.js";
import Task from "../models/Task.js";
import "../models/Associations.js";

const sequelize = db.getSequelizeInstance();

const migrateAllTables = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
    console.log("Database connection closed.");
  }
};

migrateAllTables();
