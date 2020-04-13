// @ts-ignore
const express = require("express");
// @ts-ignore
const next = require("next");
// @ts-ignore
const mysql = require("mysql")
// @ts-ignore
const bodyParser = require("body-parser");

// @ts-ignore
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev });
const handler = app.getRequestHandler();
const server = express();

const mysqlSetting = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "salon_tablet",
}
function corsHeader(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, application/json"
    );
}  

app.prepare().then(() => {
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get("/post_data/get", (req, res) => {
      const connection = mysql.createConnection(mysqlSetting);
      connection.connect(function (err) {
        if (err) throw err;

        connection.query("select * from post_data", function (
          err,
          result,
          fields
        ) {
          if (err) console.debug(err);

          return res.send(result);
        });
      });
    });

    server.post("/post_data/create/post", (req, res) => {
        const {title, date, content} = req.body
        console.log(req.body);
        corsHeader(res);
        
        const connection = mysql.createConnection(mysqlSetting);
        
        connection.connect(function (err) {
            if (err) throw err;
            const query =
              "INSERT INTO `post_data`(`title`,`date`,`content`) VALUES ('" +
              title +
              "','" +
              date +
              "','" +
              content +
              "')";
            // const query =
            //   "INSERT INTO `post_data`(`title`,`date`,`content`) VALUES ('title','2020-04-13 02:11:22','conten dayo−2ddgsagdsagfsafg')";
         
            connection.query(query,  function (err, result, fields) {
            if (err) {
                console.debug(err)
                
                res.send({ err: true, Message: "Error executing MySQL query" });
            }
            console.log(result);

            return res.send(result);
            });
        });
     });

    server.post("/post_data/update/content", (req, res) => {
        console.log(req.body);
        corsHeader(res);
        
        const connection = mysql.createConnection(mysqlSetting);
        
        connection.connect(function (err) {
            if (err) throw err;
            const query =
            "update post_data set content='" +
            req.body.content +
            "' where id=" +
            req.body.id;
            connection.query(query, function (err, result, fields) {
            if (err) {
                res.send({ err: true, Message: "Error executing MySQL query" });
            }
            console.log(result);

            return res.send(result);
            });
        });
    });

    //   -----------ここの上にバックエンドの処理を書く-----------

    // nextのルーティングへ渡している？
    server.get("*", (req, res) => {
      return handler(req, res);
    });

    server.listen(3000, (err) => {
      if (err) console.error(err.stack);
      console.debug("> Ready on http://localhost:3000");
    });
})
.catch((err) => {
console.error(err.stack);
// @ts-ignore
process.exit(1);
});
