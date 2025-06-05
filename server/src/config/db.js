import { Sequelize } from "sequelize";

class Database {
  sequelize;

  constructor() {
    this.sequelize = new Sequelize("task-tracker", "root", "", {
      host: "localhost",
      dialect: "mysql",
    });
  }

  async connectDatabase() {
    try {
      await this.sequelize.authenticate();
      console.log(`Connection has been established successfully`);
    } catch (error) {
      console.error(error);
    }
  }

  getSequelizeInstance() {
    return this.sequelize;
  }
}

const db = new Database();
export default db;
