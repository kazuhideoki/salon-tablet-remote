import { T_footer_items_create_item } from "../../../app/ActionCreator/footerItems/useCreateFooterItem";
import { db } from "../../../lib/db";

export default async (req, res) => {
  // if (req.method === "GET") {
    // return new Promise( async (resolve, reject) => {
      //  ↓？？？
      // validationErrorHandle(req, res);
      // corsHeader(res);
  
      try {
        const data = await db(
          // escape(
            "SELECT * FROM `footer_items` ORDER BY `order` ASC"
            // )
        );
  
        console.log("/footer_items/get/は " + JSON.stringify
        (data));
      
        res.status(200).json({
          rawData: data,
        });
  
        // return resolve();
  
      } catch (err) {
        console.log("/footer_items/get/のエラーは " + JSON.stringify(err));
        res.status(500).json({ err: true, data: { message: err.message } });

        // return resolve();
        
      }

    // })
  // }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
