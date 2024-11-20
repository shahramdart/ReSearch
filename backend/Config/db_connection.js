import { Sequelize } from "sequelize";

const db = new Sequelize("rent_nest", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
