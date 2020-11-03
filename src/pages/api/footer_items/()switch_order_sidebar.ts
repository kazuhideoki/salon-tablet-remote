import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { server, localhost } from "../../../lib/loadUrl";
import { TApiResponse } from "../../../lib/apiTypes";
import {
  T_order_sidebar,
  T_footer_item_id,
  T_order,
} from "../../../app/Store/Types";
import { T_footer_items_switch_order } from "./switch_order";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiFooterItemsSwitchOrderSidebar = async (
  params: T_footer_items_switch_order_sidebar
): Promise<TApiResponse<T_footer_items_switch_order_sidebar_return>> => {
  let str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/footer_items/switch_order_sidebar`, {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "https://salon-tablet.an.r.appspot.com", },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
};

export type T_footer_items_switch_order_sidebar = T_footer_items_switch_order

export type T_footer_items_switch_order_sidebar_return = { err: boolean };

const switch_order_sidebar = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { smaller, larger }: T_footer_items_switch_order_sidebar = req.body;

    //  ※db操作まとめる

    const largerToSmaller = {
      order: smaller.order,
      order_sidebar: smaller.order_sidebar,
    };
    const smallerToLarger = {
      order: larger.order,
      order_sidebar: larger.order_sidebar,
    };

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

      // ②`order_sidebar`の並び替え
      // largerをsmallerに
      // const date3 = await db(
      //   "UPDATE `footer_items` SET `order_sidebar`=? WHERE `footer_item_id`=?",
      //   [smaller.order_sidebar, larger.footer_item_id]
      // );
      // // smallerをlargerに
      // const date4 = await db(
      //   "UPDATE `footer_items` SET `order_sidebar`=? WHERE `footer_item_id`=?",
      //   [larger.order_sidebar, smaller.footer_item_id]
      // );

      const returnData: T_footer_items_switch_order_sidebar_return = { err: false };

      res.status(200).json(returnData);
    } catch (err) {
      console.log(
        "/footer_items/switch_order_sidebar/のエラーは " + JSON.stringify(err)
      );

      res.status(500).json({ err: true, data: { message: err.message } });
    }
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

export default switch_order_sidebar;
