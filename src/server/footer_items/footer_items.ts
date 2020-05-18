// import express from "express";
import mysql from 'mysql2'
import mysqlPromise from "mysql2/promise";
import { validationErrorHandle } from "../validation";
import { corsHeader } from '../server'
import { FooterItems } from "../../app/Store/Store";
import { SwitchOrderParams } from "../../app/View/Setting/buttons/SwitchOrderButton";

const mysql_setting = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "salon_tablet",
  
};

// /footer_items/get
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

  const query =
    "SELECT * FROM `footer_items` ORDER BY `order` ASC";

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


// ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
// /footer_items/create
export const footer_items_create_item = (req, res) => {
  validationErrorHandle(req,res)

  corsHeader(res);


  const connection = mysql.createConnection(mysql_setting);
  connection.connect();

  const query = "INSERT INTO `footer_items` SET ?";

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


// ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
// /footer_items/egt/single
export const footer_items_get_single = (req, res) => {
  corsHeader(res);

  const { footer_item_id } = req.body;

  const connection = mysql.createConnection(mysql_setting);
  connection.connect();

  const query = `SELECT * FROM footer_items WHERE footer_item_id=?`;
  
  connection.query(query, footer_item_id, (err, result: FooterItems, fields) => {
    if (err) {
      console.log("/footer_items/get/singleのエラーは " + JSON.stringify(err));
      res.status(500).json({ err: true, data: { message: err.message } });
    }

    const data = {
      // 結果が配列で来るので[0]↓
      rawData: result[0],
    };
    console.log("/footer_items/get/singleは " + JSON.stringify(data));

    res.json(data);
  });
  connection.end();
}


// ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
// /footer_items/update
export const footer_items_update_item = (req, res) => {
  validationErrorHandle(req, res);
  corsHeader(res);

  const { footer_item_id, is_published, created_at, updated_at, icon_name, displayed_icon_name, on_tap, item_content, link_url, order } = req.body

  const connection = mysql.createConnection(mysql_setting);
  connection.connect();

  const query = `UPDATE footer_items SET ? WHERE footer_item_id=?`;
  // うまく行かなかったら一個ずつ書く
  const data = [
    {
    is_published: is_published,
    // created_at: created_at,
    // updated_at: updated_at,
    icon_name: icon_name,
    displayed_icon_name: displayed_icon_name,
    on_tap: on_tap,
    item_content: item_content,
    link_url: link_url,
    order: order,
    },
    footer_item_id,
  ];

  connection.query(query, data, (err, result, fields) => {
    if (err) {
      console.log(
        "/footer_items/updateのエラーは " + JSON.stringify(err)
      );
      res.status(500).json({ err: true, data: { message: err.message } });
    }

    const data = {
      rawData: result,
    };
    console.log("/footer_items/updateは " + JSON.stringify(data));

    res.json(data);
  });
  connection.end();
}


// ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
// /footer_items/deeelt
export const footer_items_delete_item = (req, res) => {
  corsHeader(res);

  const { footer_item_id } = req.body;

  const connection = mysql.createConnection(mysql_setting);
  connection.connect();

  const query = 'DELETE FROM `footer_items` WHERE `footer_item_id`=?';

  connection.query(query, footer_item_id, (err, result, fields) => {
    if (err) {
      console.log("/footer_items/deleteのエラーは " + JSON.stringify(err));
      res.status(500).json({ err: true, data: { message: err.message } });
    }

    const data = {
      rawData: result,
    };
    console.log("/footer_items/deleteは " + JSON.stringify(data));

    res.json(data);
  });
  connection.end();
}

// ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
// /footer_items/switchOrder
export const footer_items_switchOrder = async (req, res) => {
  corsHeader(res);

  // 検証用
  // const [footer_item_id, order] = [2,2] 
  
  const connection = await mysqlPromise.createConnection(mysql_setting);
  
  try{
    
    const { footer_item_id, order }: SwitchOrderParams = req.body;
    console.log("footer_items_switchOrderのreq.bodyは" + JSON.stringify(req.body));
    
    // 右側のアイテムのorderを-1
    const query1 = "UPDATE `footer_items` SET `order`=? WHERE `footer_item_id`=?";
    const params1 = [order - 1, footer_item_id];
    // const [rusult1, fields1] = await connection.execute(query1, params1);
    const [rusult1, fields1] = await connection.query(query1, params1);
  
    // 左側のアイテムのorderを+1
    const query2 =
      "UPDATE `footer_items` SET `order`=? WHERE `footer_item_id`!=? AND `order`=?";
    const params2 = [order, footer_item_id, order - 1];
    const [result2, fields2] = await connection.query(query2, params2);

    console.log("/footer_items/switchOrderは " + JSON.stringify(rusult1) + ' と ' + JSON.stringify(result2));

    res.status(200).json({ err: false});

  }catch(e){

    // console.log("/footer_items/switchOrderのエラーは " + JSON.stringify(e));
    console.log("/footer_items/switchOrderのエラーは " + e );
    res.status(500).json({ err: true, data: { message: e } });

  }finally{
      connection.end();
  }

}

