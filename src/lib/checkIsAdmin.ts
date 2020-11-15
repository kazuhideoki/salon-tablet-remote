import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "../pages/api/auth/get_session";
import { getUserInfoFromEmail } from "./getUserInfoFromEmail";

type TCheckIsAdmin = {
  req: NextApiRequest
}

export const checkIsAdmin = async ({ req }: TCheckIsAdmin) => {
         const { email } = await getSession({ req });

         console.log("checkIsAminの emailは " + JSON.stringify(email));

         const userInfo = await getUserInfoFromEmail(email);
         console.log("checkIsAdminの userInfoは " + JSON.stringify(userInfo));

         return userInfo.is_admin;
       };
