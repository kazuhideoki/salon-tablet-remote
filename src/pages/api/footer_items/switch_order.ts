import { db } from '../../../lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { TApiResponse } from '../../../lib/db/apiWrap';
import {
  T_order_sidebar,
  T_footer_item_id,
  T_order,
} from '../../../app/Store/Interface';
import { apiWrapPost } from '../../../lib/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiFooterItemsSwitchOrder = async (
  params: T_footer_items_switch_order
): Promise<TApiResponse> => {
  return apiWrapPost('footer_items/switch_order', params);
};

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

const switch_order = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { smaller, larger }: T_footer_items_switch_order = req.body;

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
        'UPDATE `footer_items` SET ? WHERE `footer_item_id`=?',
        [largerToSmaller, larger.footer_item_id]
      );
      // smallerをlargerに
      const date2 = await db(
        'UPDATE `footer_items` SET ? WHERE `footer_item_id`=?',
        [smallerToLarger, smaller.footer_item_id]
      );

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log(
        '/footer_items/switch_order/のエラーは ' + JSON.stringify(err)
      );

      return res.status(500).json({ err: true, data: err });
    }
  }
};

// エラーメッセージ非表示

export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default switch_order;
