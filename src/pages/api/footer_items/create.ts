import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  Ontap,
  ModalSize,
  DataTypeFooterItem,
} from '../../../util/interface/Interface';
import { ApiResponse } from '../../../util/db/apiWrap';
import { checkIsAdmin } from '../../../util/db/checkIsAdmin';
import { apiWrapPost } from '../../../util/db/apiWrap';

export const apiFooterItemsCreate = async (
  params: ApiFooterItemsCreate
): Promise<ApiResponse> => {
  return apiWrapPost('footer_items/create', params);
};

export type ApiFooterItemsParams = {
  is_published: boolean;
  icon_name: string;
  displayed_icon_name: string | null;
  on_tap: Ontap;
  item_content: string;
  item_excerpt: string;
  link_url: string;
  app_link_url: string;
  modal_size: ModalSize;
  // on_sidebar: T_on_sidebar
  order: number;
  order_sidebar: number;
  data_type: DataTypeFooterItem;
};

export type ApiFooterItemsCreate = ApiFooterItemsParams & {
  user_id: number;
};

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const params: ApiFooterItemsCreate = req.body;

    try {
      const isAdmin = await checkIsAdmin({ req });

      if (isAdmin === false) {
        params.data_type = 'default_data';
      }

      await db(`INSERT INTO footer_items SET ?`, params);

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log('/footer_items/create/のエラーは ' + JSON.stringify(err));

      return res.status(500).json({ err: true, rawData: err } as ApiResponse);
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

export default create;
