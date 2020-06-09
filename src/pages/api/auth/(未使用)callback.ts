import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import Router from "next/router";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    // Signed in
    const { accessToken } = session.user;

    // Do something with accessToken (e.g. look up user in DB)

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        session
      })
    );
  } else {
    // Not signed in
    // res.status(302).setHeader("Location", pages.newUser);
    // res.end();
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end()
    
    // Router.push("http://localhost:3000/api/auth/signin");
  }
}