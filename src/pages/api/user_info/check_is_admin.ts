import { db } from "../lib/db";
const bcrypt = require("bcryptjs");
import { NextApiRequest, NextApiResponse } from "next";
import { cipher, checkPassword } from "../../../module/bcrypt";
import { T_user_id } from "../../../app/Store/Types";
import { server, localhost } from "../../../config";
import { TApiResponse } from "../lib/apiTypes";
import { TSessionOnj } from "../..";
import { getCsrfToken, getSession, providers } from "next-auth/client";
import { ApiUserInfoGetFromEmail } from "./getUserInfoFromEmail";


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiCheckIsAdmin = async (): Promise<TApiResponse<
         T_check_is_admin_return
       >> => {
         let str = process.browser ? server : localhost;

         const res = await fetch(`${str}/api/user_info/check_is_admin`);

         return await res.json();
       };

export type T_check_is_admin_return = boolean

const check_is_admin = async (req: NextApiRequest, res: NextApiResponse) => {
    // const { user_id, password }: T_user_info_check_is_admin = req.body;

    try {
      const sessionObj: TSessionOnj = await getSession({ req });
      // const resSessionObj = await fetch(
      //   `${localhost}/api/auth/session`
      // );
      // const sessionObj: TSessionOnj = await resSessionObj.json();

      console.log("check_is_adminの sessionObjは " + JSON.stringify(sessionObj));
      
      const userInfo = await ApiUserInfoGetFromEmail(sessionObj.user.email);
      console.log(userInfo);
      

      const result = userInfo.is_admin
      console.log("check_is_adminのresultは " + result);
      
      
      res.status(200).json(result);
      
    } catch (err) {
      console.log(
        "/user_info/check_is_admin/のエラーは " + JSON.stringify(err)
      );
      res.status(500).json({ err: true, data: { message: err.message } });
    }
};

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
  },
};

export default check_is_admin;
