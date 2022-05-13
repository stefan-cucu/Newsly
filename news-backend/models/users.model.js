module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    userid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
    tags: {
      type: Sequelize.TEXT('LONG'),
    }
  });
  return User;
};
