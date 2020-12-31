import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import { T_order_sidebar, T_footer_item_id, T_order } from "../../../app/Store/Types";
import { apiWrapPost } from "../../../lib/apiWrap";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiFooterItemsSwitchOrder = async (params:T_footer_items_switch_order):Promise<TApiResponse<T_footer_items_switch_order_return>> => {
  return apiWrapPost("footer_items/switch_order", params);
}

export type T_footer_items_switch_order = {
  smaller: {
    footer_item_id: T_footer_item_id;
    order: T_order;
    order_sidebar: T_order_sidebar;
  };
  larger: {
    footer_item_id: T_footer_item_id;
    order: T_order;
    order_sidebar: T_order_sidebar;
  };
};

export type T_footer_items_switch_order_return = { err: boolean };

const switch_order = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
   const {
     smaller, larger
   }: T_footer_items_switch_order = req.body;

  //  ※db操作まとめる

  const largerToSmaller = {
    order: smaller.order,
    order_sidebar: smaller.order_sidebar,
  }
  const smallerToLarger = {
    order: larger.order,
    order_sidebar: larger.order_sidebar,
  }

    // ※order_sidebarはタブレットビューでは必ず0だが、モバイルビューではすべて表示されていてorder_sidebarの値のあるものもあるので、一緒に入れ替える

    try {
          // largerをsmallerに
          const date1 = await db(
            "UPDATE `footer_items` SET ? WHERE `footer_item_id`=?",
            [largerToSmaller, larger.footer_item_id]
          );
          // smallerをlargerに
          const date2 = await db(
            "UPDATE `footer_items` SET ? WHERE `footer_item_id`=?",
            [smallerToLarger, smaller.footer_item_id]
          );

          const returnData: T_footer_items_switch_order_return = { err: false };

          res.status(200).json(returnData);
        } catch (err) {
      console.log("/footer_items/switch_order/のエラーは " + JSON.stringify(err));

      return res.status(500).json({ err: true, data: err });
    }
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default switch_order