import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from '../../../util/db/apiWrap';
import { InstagramMediaObject } from '../../../util/interface/Interface';
import { apiWrapPost } from '../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramMediasGet = async (
  params: ApiInstagramMediasGet
): Promise<ApiResponse<InstagramMediaObject>> => {
  return apiWrapPost('instagram_medias/get', params);
};

export type ApiInstagramMediasGet = {
  instagram_id: number;
  paging: { after: string; before: string };
};

const get = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const { instagram_id, paging }: ApiInstagramMediasGet = req.body;

    let pagingParam;
    if (paging.after) {
      pagingParam = `after=${paging.after}`;
    } else if (paging.before) {
      pagingParam = `before=${paging.before}`;
    } else {
      pagingParam = ``;
    }

    try {
      const data = (await db(
        `select access_token from instagram_accounts where instagram_id = ?`,
        instagram_id
      )) as any[];

      const { access_token } = data[0];

      const response = await fetch(
        `https://graph.instagram.com/v1.0/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${access_token}&${pagingParam}`
      );

      const data2 = await response.json();

      if (data2.error) {
        console.log('data2.errorは ' + data2.error);
        return res
          .status(500)
          .json({ err: true, rawData: data2 } as ApiResponse);
      }

      const rawData: InstagramMediaObject = data2;
      res
        .status(200)
        .json({ err: false, rawData } as ApiResponse<InstagramMediaObject>);
    } catch (err) {
      console.log('/instagram_medias/get/のエラーは ' + JSON.stringify(err));
      return res.status(500).json({ err: true, rawData: err } as ApiResponse);
    }
  }
};

// エラーメッセージ非表示
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get;
