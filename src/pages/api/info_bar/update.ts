import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { InfoBarType } from '../../../util/interface/Interface';
import { ApiResponse } from '../../../util/db/apiWrap';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInfoBarUpdate = async (
  params: ApiInfoBarUpdate
): Promise<ApiResponse> => {
  return apiWrapPost('info_bar/update', params);
};

export type ApiInfoBarUpdate = {
  user_id: number;
  info_bar_type: InfoBarType;
  scrolling_sentence: string;
  scrolling_animation_duration: number;
  selected_article_id: number;
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const params: ApiInfoBarUpdate = req.body;

    try {
      await db(`UPDATE info_bar SET ? WHERE user_id = ?`, [
        params,
        params.user_id,
      ]);

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log('/info_bar/update/のエラーは ' + JSON.stringify(err));

      return res.status(500).json({ err: true, rawData: err } as ApiResponse);
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

export default update;
