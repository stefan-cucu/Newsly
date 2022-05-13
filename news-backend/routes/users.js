var express = require('express');
var router = express.Router();

const db = require('../models/db');
const Users = db.users;

/* GET all users */
router.get('/', function(req, res, next) {
  Users.findAll().then(users => {
    res.json(users);
  });
});

/* POST new user */
router.post('/', function(req, res, next) {
  console.log(req.body);
  Users.create({
    userid: req.body.userid,
    username: req.body.username,
    role: req.body.role,
  }).then(function(result) {
    res.send(result);
  });
});

/* GET user by id */
router.get('/:id', function(req, res, next) {
  Users.findOne({
    where: {
      userid: req.params.id,
    },
  }).then(user => {
    res.json(user);
  });
});

/* POST set tags */
router.post('/:id/tags', function(req, res, next) {
  Users.findOne({
    where: {
      userid: req.params.id,
    },
  }).then(user => {
    user.update({
      tags: req.body.tags,
    }).then(function(result) {
      res.send(result);
    });
  });
});

module.exports = router;
