import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { TApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramAccountsDelete = async (
  params: ApiInstagramAccountsDelete
): Promise<TApiResponse> => {
  return apiWrapPost('instagram_accounts/delete', params);
};

export type ApiInstagramAccountsDelete = {
  instagram_id: number;
};

const instagram_accounts_delete = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'POST') {
    const { instagram_id }: ApiInstagramAccountsDelete = req.body;

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
