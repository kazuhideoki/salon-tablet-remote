import { NextApiRequest } from "next";
import { getSession } from "./auth/getSession";
import { getUserInfoFromEmail } from "./getUserInfoFromEmail";

type TCheckIsAdmin = {
  req: NextApiRequest
}

export const checkIsAdmin = async ({ req }: TCheckIsAdmin) => {
         const { email } = await getSession({ req });
         const userInfo = await getUserInfoFromEmail(email);
         return userInfo.is_admin;
       };
