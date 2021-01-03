import { db } from '../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { TApiResponse } from '../../../lib/apiWrap';
import { server, localhost } from '../../../lib/loadUrl';
import { T_instagram_id, TInstagramMedias } from '../../../app/Store/Interface';
import { apiWrapPost } from '../../../lib/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramMediasGet = async (
  params: T_instagram_medias_get
): Promise<TApiResponse<TInstagramMedias>> => {
  return apiWrapPost('instagram_medias/get', params);
};

export type T_instagram_medias_get = {
  instagram_id: T_instagram_id;
  paging: { after?: string; before?: string };
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { instagram_id, paging }: T_instagram_medias_get = req.body;

    let pagingParam;
    if (paging.hasOwnProperty('after')) {
      pagingParam = `after=${paging.after}`;
    } else if (paging.hasOwnProperty('before')) {
      pagingParam = `before=${paging.before}`;
    } else {
      pagingParam = ``;
    }

    try {
      const data = (await db(
        `select access_token from instagram_accounts where instagram_id = ?`,
        instagram_id
      )) as any[];
      if (data !== null && data.length) {
      }
      const { access_token } = data[0];

      const response = await fetch(
        `https://graph.instagram.com/v1.0/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${access_token}&${pagingParam}`
      );

      const data2 = await response.json();

      if (data2.error) {
        console.log('data2.errorは ' + data2.error);
        return res.status(500).json({ err: true, data: data2 });
      }

      const returnData: TInstagramMedias = data2;
      // {data: []}の形で取得
      return res.status(200).json(returnData);
    } catch (err) {
      console.log('/instagram_medias/get/のエラーは ' + JSON.stringify(err));
      return res.status(500).json({ err: true, data: err });
    }
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
