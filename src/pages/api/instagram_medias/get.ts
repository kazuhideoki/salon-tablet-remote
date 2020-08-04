import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { TApiResponse } from "../lib/apiTypes";
import { server, localhost } from "../../../config";
import { T_instagram_id, TInstagramMedias } from "../../../app/Store/Types";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiInstagramMediasGet = async (instagram_id: T_instagram_id):Promise<TApiResponse<TInstagramMedias>> => {
  console.log("apiInstagramMediasGetだよ instagram_idは " + instagram_id);
  
  let str = process.browser ? server : localhost

  console.log(str);
  

  const res = await fetch(`${str}/api/instagram_medias/get`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ instagram_id }),
  });
 
  return await res.json();
} 

export type T_instagram_medias_get = {
  instagram_id: T_instagram_id
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log("/instagram_medias/getだよ");
    
    const { instagram_id }: T_instagram_medias_get = req.body;

    try {

      const data = await db(`select access_token from instagram_accounts where instagram_id = ?`, instagram_id);
      const { access_token } = data[0];

      const response = await fetch(`https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${access_token}`);
      
      const data2 = await response.json();

      console.log("/instagram_medias/getは " + JSON.stringify(data2));

      if (data2.error) {
        return res
          .status(500)
          .json({ err: true, data: { message: data2.error } });
      }

      // {data: []}の形で取得
      return res.status(200).json(data2.data);

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
