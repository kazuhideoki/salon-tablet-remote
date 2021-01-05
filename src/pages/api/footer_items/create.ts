import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  T_is_published_footer_items,
  T_icon_name,
  T_displayed_icon_name,
  T_on_tap,
  T_item_content,
  T_link_url,
  T_order,
  T_item_excerpt,
  T_app_link_url,
  T_modal_size,
  T_data_type_footer_item,
  T_order_sidebar,
} from '../../../util/interface/Interface';
import { TApiResponse } from '../../../util/db/apiWrap';
import { checkIsAdmin } from '../../../util/db/checkIsAdmin';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiFooterItemsCreate = async (
  params: T_footer_items_create
): Promise<TApiResponse> => {
  return apiWrapPost('footer_items/create', params);
};

export type T_footer_items_params = {
  is_published: T_is_published_footer_items;
  icon_name: T_icon_name;
  displayed_icon_name: T_displayed_icon_name | null;
  on_tap: T_on_tap;
  item_content: T_item_content;
  item_excerpt: T_item_excerpt;
  link_url: T_link_url;
  app_link_url: T_app_link_url;
  modal_size: T_modal_size;
  // on_sidebar: T_on_sidebar
  order: T_order;
  order_sidebar: T_order_sidebar;
  data_type: T_data_type_footer_item;
};

export type T_footer_items_create = T_footer_items_params & {
  user_id: number;
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const params: T_footer_items_create = req.body;

    try {
      const isAdmin = await checkIsAdmin({ req });

      if (isAdmin === false) {
        params.data_type = 'default_data';
      }

      const data = await db(`INSERT INTO footer_items SET ?`, params);

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/footer_items/create/のエラーは ' + JSON.stringify(err));

      return res.status(500).json({ err: true, rawData: err } as TApiResponse);
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

export default create;
