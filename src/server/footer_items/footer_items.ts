// import express from "express";
import mysql from 'mysql'
import { corsHeader } from '../server'
// const server = express();

const mysql_setting = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'salon_tablet',
}

export const footer_items_get = (req, res) => {
corsHeader(res);
  
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "salon_tablet",
  });
  connection.connect(function(err) {
    if (err) throw err;
    console.log("MySQL Connected");
  });

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

    res.json(data);

  })  
  connection.end()
}

export const footer_items_create_item = (req, res) => {
  corsHeader(res);

  // const { is_published, created_at, updated_at, icon_name, displayed_icon, on_tap_modal_open, item_content, link_url, order } = req.body

  const connection = mysql.createConnection(mysql_setting);
  connection.connect();

  const query = "INSERT INTO `footer_items` set ?";
  // const data = {
  //   "is_published": is_published,
  //   "created_at": created_at,
  //   // "updated_at"は '' で入れられない→datetimeに合わない
  //   "icon_name": icon_name,
  //   "displayed_icon": JSON.stringify(displayed_icon),
  //   "on_tap_modal_open": on_tap_modal_open,
  //   "item_content": item_content,
  //   "link_url": link_url,
  //   "order": order,
  // }
  const data = req.body
  connection.query(query, data, (err, result, fields) => {
    if (err) {
      console.log("/footer_items/get/のエラーは " + JSON.stringify(err));
      res.status(500).json({ err: true, data: { message: err.message } });
    }

    const data = {
      rawData: result,
    };
    console.log("/footer_items/get/は " + JSON.stringify(data));

    res.json(data);

  });
  connection.end();
}

export const footer_items_get_single = (req, res) => {
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

    res.json(data);
  });
  connection.end();
}

export const footer_items_update_item = (req, res) => {
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

    res.json(data);
  });
  connection.end();
}

export const footer_items_delete_item = (req, res) => {
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

    res.json(data);
  });
  connection.end();
}

