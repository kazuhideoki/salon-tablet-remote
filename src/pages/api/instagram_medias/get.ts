import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TApiResponse } from "../../../lib/apiTypes";
import { server, localhost } from "../../../lib/loadUrl";
import { T_instagram_id, TInstagramMedias } from "../../../app/Store/Types";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramMediasGet = async (instagram_id: T_instagram_id, paging: { after?: string; before?: string } | null):Promise<TApiResponse<TInstagramMedias>> => {
  console.log("apiInstagramMediasGetだよ instagram_idは " + instagram_id);
  
  let str = process.browser ? server : localhost

  const params: T_instagram_medias_get = {
    instagram_id,
    paging,
  };
  // pagingCursorがあるときはページ送り用のfetch
  const res = await fetch(`${str}/api/instagram_medias/get`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });
 
  return await res.json();
} 

export type T_instagram_medias_get = {
  instagram_id: T_instagram_id;
  paging: { after?: string; before?: string };
};

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log("/instagram_medias/getだよ");
    
    const { instagram_id, paging }: T_instagram_medias_get = req.body;

    let pagingParam;
    if (paging.hasOwnProperty("after")) {
      pagingParam = `after=${paging.after}`;
    } else if (paging.hasOwnProperty("before")) {
      pagingParam = `before=${paging.before}`;
    } else {
      pagingParam = ``;
    }

    try {

      const data = await db(`select access_token from instagram_accounts where instagram_id = ?`, instagram_id);
      const { access_token } = data[0];

      const response = await fetch(
        `https://graph.instagram.com/v1.0/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${access_token}&${pagingParam}`
      );
      
      // const data2: TInstagramMedias | {error: boolean} = await response.json();
      const data2 = await response.json();

      console.log("/instagram_medias/getは " + JSON.stringify(data2));

      if (data2.error) {
        return res
          .status(500)
          .json({ err: true, data: { message: data2.error } });
      }

      const returnData:TInstagramMedias = data2
      // {data: []}の形で取得
      return res.status(200).json(returnData);

    } catch (err) {
      console.log("/instagram_medias/get/のエラーは " + JSON.stringify(err));
      return res.status(500).json({ err: true, data: { message: err.message } });
    }
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};

export default get