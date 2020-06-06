import { T_footer_items_create_item } from "../../../app/ActionCreator/footerItems/useCreateFooterItem";
import { db } from "../../../lib/db";

export default async (req, res) => {
  if (req.method === "POST") {
    //  ↓？？？
  // validationErrorHandle(req, res);
  // corsHeader(res);


  const params = req.body.params;
    try {
      const data = await db(
        escape(`
        NSERT INTO footer_items SET ${params}
      `)
      );

      console.log("/footer_items/create/は " + JSON.stringify(data));

      res.status(200).json({
        rawData: data,
      });
    } catch (err) {
      console.log("/footer_items/create/のエラーは " + JSON.stringify(err));
      res.status(500).json({ err: true, data: { message: err.message } });
    }
  }
}