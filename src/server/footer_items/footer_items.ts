// import express from "express";
import mysql from 'mysql2'
import mysqlPromise from "mysql2/promise";
import { validationErrorHandle } from "../validation";
import { corsHeader } from '../server'
import { FooterItems, T_footer_item_id } from "../../app/Store/Store";
import { SwitchOrderParams } from "../../app/View/buttons/SwitchOrderButton";
import {
  TUpdateFooterItem,
  T_footer_items_update_item,
} from "../../app/ActionCreator/footerItems/useUpdateFooterItem";
import { T_footer_items_create_item } from '../../app/ActionCreator/footerItems/useCreateFooterItem';

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
  // connection.connect();

  const query = "INSERT INTO `footer_items` SET ?";

  const data: T_footer_items_create_item = req.body.params
  connection.query(query, data, (err, result, fields) => {
    if (err) {
      console.log("/footer_items/create/のエラーは " + JSON.stringify(err));
      res.status(500).json({ err: true, data: { message: err.message } });
    }

    const data = {
      rawData: result,
    };
    console.log("/footer_items/create/は " + JSON.stringify(data));

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
  // connection.connect();

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
type TUpdateData = [T_footer_items_update_item, T_footer_item_id]

export const footer_items_update_item = (req, res) => {
  validationErrorHandle(req, res);
  corsHeader(res);

  const { params, id }: TUpdateFooterItem = req.body;

  const connection = mysql.createConnection(mysql_setting);
  // connection.connect();

  const query = `UPDATE footer_items SET ? WHERE footer_item_id=?`;
  // うまく行かなかったら一個ずつ書く
  const data: TUpdateData = [params, id];

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
export const footer_items_delete_item = async (req, res) => {
  corsHeader(res);

  const { footer_item_id, order } = req.body;

  const connection = await mysqlPromise.createConnection(mysql_setting);
  // connection.connect();
  try {
    // 該当アイテムの削除
    const query = "DELETE FROM `footer_items` WHERE `footer_item_id`=?";
    const [result, fields] = await connection.query(query, footer_item_id)

    // orderの調整。削除されたものより大きいorderを持つitem(左側のアイテム)をぞれぞれ-1する。
    const query2 = " UPDATE `footer_items` SET `order` = `order` -1 WHERE `order` > ? ";
    // const arg = order
     const [result2, fields2] = await connection.query(query2, order);

    const data = {
      rawData: result,
      fields2: fields2,
    };
    console.log("/footer_items/deleteは " + JSON.stringify(data));

    res.json(data);

  } catch(e) {
    console.log("/footer_items/deleteのエラーは " + JSON.stringify(e));
    res.status(500).json({ err: true, data: { message: e.message } });
  } finally {
    connection.end();
  }
}

// ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
// /footer_items/switchOrder
export const footer_items_switchOrder = async (req, res) => {
  corsHeader(res);
  
  const connection = await mysqlPromise.createConnection(mysql_setting);
  
  try{
    
    const { footer_item_id, order }: SwitchOrderParams = req.body;
    console.log("footer_items_switchOrderのreq.bodyは" + JSON.stringify(req.body));
    
    // 右側のアイテムのorderを-1
    const query1 = "UPDATE `footer_items` SET `order`=? WHERE `footer_item_id`=?";
    const params1 = [order - 1, footer_item_id];
    const [rusult1, fields1] = await connection.query(query1, params1);
  
    // 左側のアイテムのorderを+1
    const query2 =
      "UPDATE `footer_items` SET `order`=? WHERE `footer_item_id`!=? AND `order`=?";
    const params2 = [order, footer_item_id, order - 1];
    const [result2, fields2] = await connection.query(query2, params2);

    console.log("/footer_items/switchOrderは " + JSON.stringify(rusult1) + ' と ' + JSON.stringify(result2));

    res.status(200).json({ err: false});

  }catch(e){
    console.log("/footer_items/switchOrderのエラーは " + e );
    res.status(500).json({ err: true, data: { message: e } });
  }finally{
      connection.end();
  }
}

