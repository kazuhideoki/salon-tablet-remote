import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "./auth/getSession";
import { getUserInfoFromEmail } from "./getUserInfoFromEmail";

type TCheckIsAdmin = {
  req: NextApiRequest,
  res: NextApiResponse
}

export const checkIsAdmin = async ({ req, res }: TCheckIsAdmin) => {
         const { email } = await getSession({ req, res });

         console.log("checkIsAminの emailは " + JSON.stringify(email));

         const userInfo = await getUserInfoFromEmail(email);
         console.log("checkIsAdminの userInfoは " + JSON.stringify(userInfo));

         return userInfo.is_admin;
       };
