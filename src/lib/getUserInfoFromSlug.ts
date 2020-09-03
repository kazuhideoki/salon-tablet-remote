import { db } from "./db";
import { NextApiRequest, NextApiResponse } from "next";
import { checkOrders } from "./checkOrders";
import { T_user_id, T_is_generate_public_page, T_public_page_slug, TUserInfo } from "../app/Store/Types";
import { correctOrders } from "./correctOrders";
import { changeToBooleanFromNumber } from "./changeToBooleanFromNumber";
import { localhost, server } from "./loadUrl";
import { TApiResponse, TApiError } from "./apiTypes";
import { userInfoParamsFromSql } from "./userInfoParamsFromSql";

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const getUserInfoFromSlug = async (
         slug: string
       ): Promise<TUserInfo> => {
         //@ts-ignore
         const data: TUserInfo[] = await db(`SELECT * FROM user_info`);

         const target = data.filter((value) => {
           return value.public_page_slug === slug;
         });

         if (target.length) {
          return userInfoParamsFromSql(target[0]);
         } else {
          return null
         }

       };

// const get_user_info_from_slug = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { slug } = req.query as T_get_user_info_from_slug;

  
//   try {
//     //@ts-ignore
//     const data: TUserInfo[] = await db(`SELECT * FROM user_info`)

//     const target = data.filter(value => {
//       return value.public_page_slug === slug
//     })

//     let returnData: TUserInfo
//     if (target.length) {
//       returnData = userInfoParamsFromSql(target[0])
//     } else {
//       returnData = { userInfo: null }
//     }

//     return res.status(200).json(returnData);

//   } catch (err) {
//     console.log(
//       "/user_info/get_user_info_from_slug/のエラーは " + JSON.stringify(err)
//     );
//     const errOnj: TApiError = { err: true, data: { message: err.message } };
//     return res.status(500).json(errOnj);
//   }
// };

// // socketうんぬんの エラーメッセージを表示させないようにする
// export const config = {
//   api: {
//     externalResolver: true,
//   },
// };

// export default get_user_info_from_slug;
