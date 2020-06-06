import { T_footer_items_create_item } from "../../../app/ActionCreator/footerItems/useCreateFooterItem";
import { db } from "../../../lib/db";
import Router from "next/router";


export default async (req, res) => {
  if (req.method === "POST") {
    //  ↓？？？
    // validationErrorHandle(req, res);
    // corsHeader(res);

    const { footer_item_id } = req.body;
    try {
      const data = await db(
        escape(`
        SELECT * FROM footer_items WHERE footer_item_id=${footer_item_id}
      `)
      );

      console.log("/footer_items/get_single/は " + JSON.stringify(data));

      res.status(200).json({
        rawData: data[0],
      });
    } catch (err) {
      console.log("/footer_items/get_single/のエラーは " + JSON.stringify(err));
      res.status(500).json({ err: true, data: { message: err.message } });
    }
  }
};
