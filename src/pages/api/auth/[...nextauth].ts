import NextAuth from "next-auth";
import Providers from "next-auth/providers";
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
      // SMTP connection string or nodemailer configuration object https://nodemailer.com/d
      server: process.env.EMAIL_SERVER,
      // Email services often only allow sending email from a valid/verified address
      from: process.env.EMAIL_FROM,
    }),
    // When configuring oAuth providers make sure you enabling requesting
    // permission to get the users email address (required to sign in)
  ],
  // The 'database' option should be a connection string or TypeORM
  // configuration object https://typeorm.io/#/connection-options
  //
  // Note: You need to install an appropriate node_module for your database
  database: process.env.DATABASE_URL,

  // Use JSON Web Tokens instead of database sessions
  jwt: false,

  // Additional options
  //
  // secret: 'abcdef123456789' // Recommended. Used to encode data and to sign cookies. Auto-generated if not specified.

  sessionMaxAge: 10 * 1000, // Expire sessions
  // sessionUpdateAge: 10 * 1000, // Update session expiry only if session was updated more recently than the last 24 hours

  // verificationMaxAge: 60 * 60 * 1000, // Expire verification links (for email sign in)

  // debug: true, // Use this option to enable debug messages in the console

  // pages: {
  //   signin: "/auth/signin",
  // },
};
console.log(JSON.stringify(options));

export default (req, res) => NextAuth(req, res, options);
