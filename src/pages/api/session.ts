import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession();

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
    res.status(302).setHeader("Location", "/sign-in");
    res.end();
  }
};
