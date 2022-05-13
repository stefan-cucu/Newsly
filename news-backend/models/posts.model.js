module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
      postid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      userid: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT('LONG'),
      },
      tags: {
        type: Sequelize.TEXT('LONG'),
      }
    });
    Post.belongsTo(sequelize.models.user, {
      foreignKey: "userid",
    });
    return Post;
  };
  