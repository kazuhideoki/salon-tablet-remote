import { db } from "../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { session } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const sessionObj = await session({ req });
  // sessionがなければ(ユーザーがサインインしてなければ)user_infoは渡さない
  // console.log("sessionObjは" + JSON.stringify(sessionObj));
  
  if (!sessionObj) {
    // return res.status(200).json({
    //   data: null
    // });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        data: null,
      })
    );
  }

  try {
    // これだめ → ORDER BY user_id, LIMIT 1
    const data = await db(
      "select * from `user_info` where `user_email` = ?",
      sessionObj.user.email
    );

    console.log("/user_info/get/は " + data);

    // return res.status(200).json({
    //   data: data[0],
    // });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        data: data[0],
      })
    );

  } catch (err) {
    console.log("/user_info/get/のエラーは " + JSON.stringify(err));
    // return res.status(500).json({ err: true, data: { message: err.message } });
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ err: true, data: { message: err.message } }));

  }
};

// socketうんぬんの エラーメッセージを表示させないようにする
export const config = {
  api: {
    externalResolver: true,
  },
};
