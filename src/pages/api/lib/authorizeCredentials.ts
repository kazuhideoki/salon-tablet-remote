import { T_user_info_check_credentials, apiUserInfoCheckCredentials } from "../user_info/check_credentials";
import { db } from "./db";
import { server } from "../../../config";

type TCredentials = {
  email: string
  password: string
}

const authorizeCredentials = async (credentials: TCredentials) => {
  
  const params: T_user_info_check_credentials = {
    email: credentials.email,
    password: credentials.password,
  };

  console.log(
    "authorizeCredentialsでcheck_credentialsに送るparamsは " +
      JSON.stringify(params)
  );

  try {
    const data = await apiUserInfoCheckCredentials(params);

    console.log(
      "authorizeCredentialsでcheck_credentialsからの戻り値は " + JSON.stringify(data)
    );

    if (data === true) {
      try {

        const user = await db(`select * from users where email = ?`, credentials.email);

        console.log("authorizeCredentialsでusersからの戻り値は " + JSON.stringify(user));
        
  
        if (user) {
          return Promise.resolve(user[0]);
        } else {
          return Promise.resolve(false);
        }

      } catch (err) {
        return Promise.reject(err);
      }
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export default authorizeCredentials