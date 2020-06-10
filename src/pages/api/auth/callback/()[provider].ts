import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Router from "next/router";
// require("dotenv").config();
// const site =
//   process.env.NODE_ENV !== "production"
//     ? process.env.SITE
//     : process.env.SITE_PRO;

// メール認証後sign-upのページに遷移させるためのapi
// next-authのもとの GET api/auth/callback/:providerを編集
export default async (req: NextApiRequest, res: NextApiResponse) => {
 
    res.writeHead(302, { Location: "/sign-up" }).end();

}



