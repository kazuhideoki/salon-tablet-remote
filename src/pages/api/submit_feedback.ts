const bcrypt = require("bcryptjs");
import { NextApiRequest, NextApiResponse } from "next";

const receiverEmailAddress = "infosalontablet@gmail.com";
const senderEmailAddress = "infosalontablet@gmail.com";
const senderEmailPassword = "2356Sp!p";

// const nodemailer = require("nodemailer");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  // port: 465,
  // secure: true, // SSL
  port: 587,
  secure: false,
  auth: {
    user: senderEmailAddress,
    pass: senderEmailPassword,
  },
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    const { contactFormTitle, contactFormContent, user_name } = req.body;
    
    const mailOptions1 = {
      from: senderEmailAddress,
      to: receiverEmailAddress,
      subject: `【問い合わせ】:${contactFormTitle}`,
      text: `${contactFormContent} from ${user_name}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions1);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // return Promise.resolve({ sent: true });
      // return { sent: true }
      console.log("infoは " + JSON.stringify(info));
      
      return res.status(200).json({sent: true});
    } catch (err) {
      // return { sent: false, err: err }
      return res
        .status(500)
        .json({sent: false, err: true, data: { message: err.message } });
    }
  }
};

// export type T_submit_feedback = {sent: boolean, err?: any}

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
