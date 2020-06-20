import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { db } from "../lib/db";
import { T_check_credentials } from "../user_info/check_credentials";
import authorizeCredentials from "../lib/authorizeCredentials";
// これで環境変数(.envファイル)が使えるようになる
require("dotenv").config();

const site =
  process.env.NODE_ENV !== "production"
    ? process.env.SITE
    : process.env.SITE_PRO;

const options = {
  // site: process.env.SITE,
  site: site,
  providers: [
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    Providers.Credentials({
      authorize: async (credentials) => authorizeCredentials(credentials),
    }),
  ],
  database: process.env.DATABASE_URL,
  jwt: true,
  session: {
    jwt: true,
  },
  sessionMaxAge: 24 * 60 * 60 * 1000, // Expire sessions

  pages: {
    signin: "/auth/signin",
  },

  debug: true,
};

export default (req, res) => NextAuth(req, res, options);


