import { db } from '../../../lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { T_instagram_id } from '../../../app/Store/Interface';
import { TApiResponse } from '../../../lib/db/apiWrap';
import { apiWrapPost } from '../../../lib/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramAccountsDelete = async (
  params: T_instagram_accounts_delete
): Promise<TApiResponse> => {
  return apiWrapPost('instagram_accounts/delete', params);
};

export type T_instagram_accounts_delete = {
  instagram_id: T_instagram_id;
};

const instagram_accounts_delete = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { instagram_id }: T_instagram_accounts_delete = req.body;

    try {
      await db(
        `DELETE FROM instagram_accounts WHERE instagram_id = ?`,
        instagram_id
      );

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log(
        '/instagram_accounts/delete/のエラーは ' + JSON.stringify(err)
      );

      res.status(500).json({ err: true, rawData: err } as TApiResponse);
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

export default instagram_accounts_delete;
