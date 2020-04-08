const express = require("express");
const next = require("next");
const mysql = require("mysql")

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();
const server = express();

app
  .prepare()
  .then(() => {

    server.get("/post_data", (req, res) => {
        const connection = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "root",
          database: "salon_tablet",
        });
        
      connection.connect(function (err) {
        if (err) throw err;

        connection.query("select title from post_data", function (
          err,
          result,
          fields
        ) {
          if (err) throw err;

          return res.send(result[0]);
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
    process.exit(1);
  });
