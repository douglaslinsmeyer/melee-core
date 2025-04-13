import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING as string, {
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
});

export { sequelize };
export default sequelize;