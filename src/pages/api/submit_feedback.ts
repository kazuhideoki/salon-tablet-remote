const bcrypt = require("bcryptjs");
import { NextApiRequest, NextApiResponse } from "next";
import { TUserInfo } from "../../app/Store/Store";

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

export type T_submit_feedback = {
  contactFormTitle: string;
  contactFormContent: string;
  userInfo: TUserInfo;
};


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {

    const {
      contactFormTitle,
      contactFormContent,
      userInfo,
    }: T_submit_feedback = req.body;
    
    const mailOptions1 = {
      from: senderEmailAddress,
      to: receiverEmailAddress,
      subject: `【問い合わせ】:${contactFormTitle}`,
      text: `${contactFormContent} \n\n\n\n from \n\n ${JSON.stringify(userInfo)}`,
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
