import { getCsrfToken, getSession, providers } from "next-auth/client";
import { NextApiRequest } from "next";
import { TSessionOnj } from "../pages";

export const isSession = async (req: NextApiRequest) => {

  const sessionObj: TSessionOnj = await getSession({ req });
  
  if (!sessionObj) {
    throw 'Sessionがありません。'
  }

  console.log('isSessionは true');
  

  return true

}
