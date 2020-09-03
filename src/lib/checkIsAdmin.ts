import { TSessionOnj } from "../pages";
import { getCsrfToken, getSession, providers } from "next-auth/client";
import { NextApiRequest } from "next";
import { getUserInfoFromEmail } from "./getUserInfoFromEmail";


export const checkIsAdmin = async (req: NextApiRequest) => {
         const sessionObj: TSessionOnj = await getSession({ req });

         console.log(
           "checkIsAminの sessionObjは " + JSON.stringify(sessionObj)
         );

         const userInfo = await getUserInfoFromEmail(sessionObj.user.email);
         console.log('checkIsAdminの userInfoは ' + JSON.stringify(userInfo));

         return userInfo.is_admin;
       };