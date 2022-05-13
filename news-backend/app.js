var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var WSServer = require("ws").Server;
var usersApi = require("./routes/users");
var decodeToken = require("./middleware/index");

const db = require("./models/db");
db.sequelize.sync();

var app = express();
app.set('view engine', 'jade');
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
app.use("/api", decodeToken);

app.use("/api/users", usersApi);
app.use("/api/posts", require("./routes/posts"));

app.get("/*", function (req, res) {
  console.log("req.url", req.url);
  res.sendFile(__dirname + "/public/index.html");
});


// WebSocket server
var wss = new WSServer({ port: 8081 });
var postCount = 0;
const Posts = db.posts;

wss.on("connection", function connection(ws) {
  setInterval(() => {
    Posts.findAll({
      attributes: [
        [db.sequelize.fn("COUNT", db.sequelize.col("postid")), "count"],
      ],
    }).then((result) => {
      if (result[0].dataValues.count !== postCount) {
        wss.clients.forEach(function each(client) {
          if (client !== ws) {
            client.send(result);
          }
        });
        postCount = result[0].dataValues.count;
      }
    });
  }, 1000);
});

module.exports = app;
