import express from "express";
import mysql from 'mysql'
import { corsHeader } from '../server'
const server = express();

const mysql_setting = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'salon_tablet',
}

export const footerItems = () => { 

  server.get("/footer_items/get", (req, res) => {
  corsHeader(res);
    
    const connection = mysql.createConnection(mysql_setting)
    connection.connect()

    const query = 'SELECT * FROM `footer_items`'

    connection.query(query, (err, result, fields) => {

      if (err) {
        console.log("/footer_items/get/のエラーは " + JSON.stringify(err));
        res.status(500).json({ err: true, data: { message: err.message } });
      }

      const data = {
        // それぞれのgetやpostでtoArray()は必要か？
        rawData: result,
      };
      console.log("/footer_items/get/は " + JSON.stringify(data));

      res.send(data);

    })  
    connection.end()
  });

  server.post("/footer_items/create/item", (req, res) => {
    corsHeader(res);

    const { is_published, created_at, updated_at, icon_name, displayed_icon, on_tap_modal_open, item_content, link_url, order } = req.body

    const connection = mysql.createConnection(mysql_setting);
    connection.connect();

    const query = "INSERT INTO `footer_items` set ?";
    // const data = JSON.stringify(req.body)
    const data = {
      "is_published": is_published,
      "created_at": created_at,
      "updated_at": updated_at,
      "icon_name": icon_name,
      "displayed_icon": displayed_icon,
      "on_tap_modal_open": on_tap_modal_open,
      "item_content": item_content,
      "link_url": link_url,
      "order": order,
    }
    connection.query(query, data, (err, result, fields) => {
      if (err) {
        console.log("/footer_items/get/のエラーは " + JSON.stringify(err));
        res.status(500).json({ err: true, data: { message: err.message } });
      }

      const data = {
        rawData: result,
      };
      console.log("/footer_items/get/は " + JSON.stringify(data));

      res.send(data);

    });
    connection.end();
  });

  server.post("/footer_items/get/single", (req, res) => {
    corsHeader(res);

    const { footer_item_id } = req.body;

    const connection = mysql.createConnection(mysql_setting);
    connection.connect();

    const query = `SELECT * FROM 'footer_items' WHERE 'footer_item_id' = ${footer_item_id}`;
    
    connection.query(query, (err, result, fields) => {
      if (err) {
        console.log(
          "/footer_items/get/singleのエラーは " + JSON.stringify(err)
        );
        res.status(500).json({ err: true, data: { message: err.message } });
      }

      const data = {
        rawData: result,
      };
      console.log("/footer_items/get/singleは " + JSON.stringify(data));

      res.send(data);
    });
    connection.end();
  });

  server.post("/footer_items/update/item", (req, res) => {
    corsHeader(res);

    const { footer_item_id } = req.body;

    const connection = mysql.createConnection(mysql_setting);
    connection.connect();

    const query = `UPDATE 'footer_items' SET ${req.body} WHERE 'footer_item_id' = ${footer_item_id}`;
    // うまく行かなかったら一個ずつ書く
    // const data = {
    //   is_published: is_published,
    //   created_at: created_at,
    //   updated_at: updated_at,
    //   icon_name: icon_name,
    //   displayed_icon: displayed_icon,
    //   on_tap_modal_open: on_tap_modal_open,
    //   item_content: item_content,
    //   link_url: link_url,
    //   order: order,
    // };

    connection.query(query, (err, result, fields) => {
      if (err) {
        console.log(
          "/footer_items/update/itemのエラーは " + JSON.stringify(err)
        );
        res.status(500).json({ err: true, data: { message: err.message } });
      }

      const data = {
        rawData: result,
      };
      console.log("/footer_items/update/itemは " + JSON.stringify(data));

      res.send(data);
    });
    connection.end();
  });

  server.post("/footer_items/delete/item", (req, res) => {
    corsHeader(res);

    const { footer_item_id } = req.body;

    const connection = mysql.createConnection(mysql_setting);
    connection.connect();

    const query = `DELETE FROM 'footer_items' WHERE 'footer_item_id' = ${footer_item_id}`;

    connection.query(query, (err, result, fields) => {
      if (err) {
        console.log(
          "/footer_items/delete/itemのエラーは " + JSON.stringify(err)
        );
        res.status(500).json({ err: true, data: { message: err.message } });
      }

      const data = {
        rawData: result,
      };
      console.log("/footer_items/delete/itemは " + JSON.stringify(data));

      res.send(data);
    });
    connection.end();
  });

}