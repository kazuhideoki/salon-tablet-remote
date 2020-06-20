import { T_check_credentials } from "../user_info/check_credentials";
import { db } from "./db";

export default async (credentials) => {

  const params: T_check_credentials = {
    // user_email: credentials.user_email,
    user_email: credentials.email,
    password: credentials.password,
  };

  try {

    const res = await fetch(
      `${location.protocol}//${location.host}/api/user_info/check_credentials`, //★要変更
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data: boolean = await res.json();
    console.log("authorizeCredentialsでcheck_credentialsからの戻り値は " + data);
    
  
    if (data === true) {
      const user = db(
        `select * from users where email = ?`,
        credentials.user_email
      );
  
      if (user) {
        return Promise.resolve(user);
      } else {
        return Promise.resolve(false);
      }
    }
  } catch (err) {
    return Promise.reject(false);
  }

  
};
