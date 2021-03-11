import { NextApiRequest, NextApiResponse } from 'next';
import { UserInfo } from '../../util/interface/Interface';
import { ApiResponse } from '../../util/db/apiWrap';
import nodemailer from 'nodemailer';

const receiverEmailAddress = 'infosalontablet@gmail.com';
const senderEmailAddress = 'infosalontablet@gmail.com';
const senderEmailPassword = process.env.INFOSALONTABLET_PASSWORD;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: senderEmailAddress,
    pass: senderEmailPassword,
  },
});

export type ApiSubmitFeedback = {
  contactFormTitle: string;
  contactFormContent: string;
  userInfo: UserInfo;
};

export type ApiSubmitFeedback_return_no_error = { sent: true };

const submit_feedback = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const {
      contactFormTitle,
      contactFormContent,
      userInfo,
    }: ApiSubmitFeedback = req.body;

    const mailOptions1 = {
      from: senderEmailAddress,
      to: receiverEmailAddress,
      subject: `【問い合わせ】:${contactFormTitle}`,
      text: `${contactFormContent} \n\n\n\n from \n\n ${JSON.stringify(
        userInfo
      )}`,
    };

    try {
      // await transporter.verify();
      transporter.verify(async function (error) {
        if (error) {
          console.log(`submit_feedback transporter.verify: ${error}`);
        } else {
          console.log('Server is ready to take our messages');
          const info = await transporter.sendMail(mailOptions1);

          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          res.status(200).json({ err: false, rawData: null } as ApiResponse);
        }
      });
    } catch (err) {
      console.log('/submit_feedbackのエラーは ' + JSON.stringify(err));

      return res.status(500).json({ err: true, rawData: err } as ApiResponse);
    }
  }
};

export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default submit_feedback;
