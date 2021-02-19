import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

export const apiFooterItemsSwitchOrder = async (
  params: ApiFooterItemsSwitchOrder
): Promise<ApiResponse> => {
  return apiWrapPost('footer_items/switch_order', params);
};

export type ApiFooterItemsSwitchOrder = {
  smaller: {
    footer_item_id: number;
    order: number;
    order_sidebar: number;
  };
  larger: {
    footer_item_id: number;
    order: number;
    order_sidebar: number;
  };
};

const switch_order = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const { smaller, larger }: ApiFooterItemsSwitchOrder = req.body;

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
      await db('UPDATE `footer_items` SET ? WHERE `footer_item_id`=?', [
        largerToSmaller,
        larger.footer_item_id,
      ]);
      // smallerをlargerに
      await db('UPDATE `footer_items` SET ? WHERE `footer_item_id`=?', [
        smallerToLarger,
        smaller.footer_item_id,
      ]);

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log(
        '/footer_items/switch_order/のエラーは ' + JSON.stringify(err)
      );

      return res.status(500).json({ err: true, data: err });
    }
  }
};

export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default switch_order;
