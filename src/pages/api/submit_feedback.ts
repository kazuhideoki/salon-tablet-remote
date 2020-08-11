const bcrypt = require("bcryptjs");
import { NextApiRequest, NextApiResponse } from "next";
import { TUserInfo } from "../../app/Store/Types";
import { TApiResponse } from "./lib/apiTypes";
import { server, localhost } from "../../config";

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


// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiSubmitFeedback = async (
  params: T_submit_feedback
): Promise<T_submit_feedback_return> => {
  const str = process.browser ? server : localhost;

  const res = await fetch(`${str}/api/submit_feedback`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    mode: "cors",
    body: JSON.stringify(params),
  });

  return await res.json();
};

export type T_submit_feedback = {
  contactFormTitle: string;
  contactFormContent: string;
  userInfo: TUserInfo;
};

export type T_submit_feedback_return_no_error = { sent: true };
// T_submit_feedback_returnは成功も失敗も一緒くたにしてしまった、無理やり方を合わせるため
export type T_submit_feedback_return = {sent: boolean, err: true, data: { message: string } }


const submit_feedback = async (req: NextApiRequest, res: NextApiResponse) => {
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
      text: `${contactFormContent} \n\n\n\n from \n\n ${JSON.stringify(
        userInfo
      )}`,
    };

    try {
      const info = await transporter.sendMail(mailOptions1);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // return Promise.resolve({ sent: true });
      // return { sent: true }
      console.log("infoは " + JSON.stringify(info));

      const retrunData: T_submit_feedback_return_no_error = { sent: true };
      return res.status(200).json(retrunData);
    } catch (err) {
      const returnData: T_submit_feedback_return = {
        sent: false,
        err: true,
        data: { message: err.message },
      };
      return returnData;
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

export default submit_feedback;