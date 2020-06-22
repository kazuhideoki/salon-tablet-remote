import { T_check_credentials } from "../user_info/check_credentials";
import { db } from "./db";

type TCredentials = {
  email: string
  password: string
}

export default async (credentials: TCredentials) => {
  
  const params: T_check_credentials = {
    // user_email: credentials.user_email,
    email: credentials.email,
    password: credentials.password,
  };

  console.log(
    "authorizeCredentialsでcheck_credentialsに送るparamsは " +
      JSON.stringify(params)
  );

  try {
    const res = await fetch(
      // `${location.protocol}//${location.host}/api/user_info/check_credentials`,
      `http://localhost:3000/api/user_info/check_credentials`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data: boolean = await res.json();
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
