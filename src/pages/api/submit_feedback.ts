import { NextApiRequest, NextApiResponse } from 'next';
import { TUserInfo } from '../../app/store/Interface';
import { apiWrapPost, TApiResponse } from '../../util/db/apiWrap';

const receiverEmailAddress = 'infosalontablet@gmail.com';
const senderEmailAddress = 'infosalontablet@gmail.com';
const senderEmailPassword = '2356Sp!p';

import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: senderEmailAddress,
    pass: senderEmailPassword,
  },
});

// // サーバーサイドとフロントサイド考えずに使えるようにラップする
// export const apiSubmitFeedback = async (
//   params: T_submit_feedback
// ): Promise<TApiResponse<void>> => {
//   return apiWrapPost('submit_feedback', params);
// };

export type T_submit_feedback = {
  contactFormTitle: string;
  contactFormContent: string;
  userInfo: TUserInfo;
};

export type T_submit_feedback_return_no_error = { sent: true };

const submit_feedback = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
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

      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/submit_feedbackのエラーは ' + JSON.stringify(err));

      return res.status(500).json({ err: true, rawData: err } as TApiResponse);
    }
  }
};

// エラーメッセージ非表示

export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default submit_feedback;
