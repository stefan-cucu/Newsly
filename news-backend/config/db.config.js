module.exports = {
  HOST: "localhost",
  USER: "admin",
  PASSWORD: "password",
  DB: "newsapp",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
