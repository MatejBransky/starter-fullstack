import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: 'postgres',
    port: process.env.DB_PORT,
  }
);

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
};

Object.values(models).forEach(model => {
  if ('associate' in model) {
    model.associate(models);
  }
});

export { sequelize };

export default models;
