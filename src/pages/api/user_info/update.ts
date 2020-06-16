import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { T_update_user } from "../../../app/ActionCreator/user/useUpdateUser";
import { cipher } from "../../../module/bcrypt";


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { columns }: T_update_user = req.body;
    
    // sqlに入れる用のparamsを,bcryptとともに生成し直す
    // const params = Object.assign({ bcrypt_password: '' }, columns);
    const bcrypt = cipher(req.body.plainTextPassword);
    console.log(bcrypt);
    //@ts-ignore
    // params.bcrypt_password = bcrypt;
    
    const params = {
      bcrypt_password: bcrypt,
      user_id: columns.user_id,
      user_name: columns.user_name,
      shop_name: columns.shop_name,
      user_email: columns.user_email,
    }
  
    console.log(JSON.stringify(params));
    
    console.log("/user_info/update/のsqlに入れるparamsは " + JSON.stringify(params));

    try {
      const data = await db(`UPDATE user_info SET ? WHERE user_id = ?`, [
        params,
        columns.user_id,
      ]);
      console.log("/user_info/update/は " + JSON.stringify(data));

      res.status(200).json({
        rawData: data,
      });
    } catch (err) {
      console.log("/user_info/update/のエラーは " + JSON.stringify(err));

      res.status(500).json({ err: true, data: { message: err.message } });
    }
  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
