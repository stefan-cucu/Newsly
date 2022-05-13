var express = require("express");
var router = express.Router();
var crypto = require("crypto");

const db = require("../models/db");
const Posts = db.posts;

/* GET all posts */
router.post("/", function (req, res, next) {
  Posts.findAll({
    include: {
      model: db.users,
      attributes: ["username"],
    },
  }).then((posts) => {
    posts = posts.filter((post) => {
      var localTags = post.tags.split("#");
      // check if req tags are in localTags
      var reqTags = req.body.tags.split("#");
      var isInTags = true;
      reqTags.forEach((tag) => {
        if(tag === "") return;
        if (!localTags.includes(tag)) {
          isInTags = false;
        }
      });
      return isInTags;
    });
    res.json(posts);
  });
});

/* GET post by id */
router.get("/:id", function (req, res, next) {
  Posts.findOne({
    where: {
      postid: req.params.id,
    },
  }).then((post) => {
    res.json(post);
  });
});

/* PUT new post */
router.put("/", function (req, res, next) {
  const postid = crypto.randomUUID();
  Posts.create({
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags.join("#"),
    postid: postid,
    userid: req.body.userid,
  }).then(function (result) {
    res.send(200);
  });
});

module.exports = router;
