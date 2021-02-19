import { db } from '../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { server, instagramRedirectHost } from '../../../util/loadUrl';
import { apiInstagramAccountsReconnectNeeded } from './reconnect_needed';
import { apiGetUserInfoFromEmail } from '../user_info/get';

// ※instagramアカウントを認証するときのリダイレクト先

import FormData from 'form-data';
import { apiGetSession } from '../../../util/db/apiGetSession';

const get_token = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.query.error) {
    console.log('インスタグラムアカウントの接続ができませんでした。');
    fetch(`${server}`);
  }

  const form = new FormData();
  form.append('client_id', process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID);
  form.append('client_secret', process.env.INSTAGRAM_APP_SECRET);
  form.append('code', req.query.code);
  form.append('grant_type', 'authorization_code');
  form.append(
    'redirect_uri',
    `${instagramRedirectHost}/api/instagram_accounts/get_token`
  );

  try {
    const response = await fetch(
      `https://api.instagram.com/oauth/access_token`,
      {
        method: 'POST',
        body: form as any,
      }
    );

    const shortLived = await response.json();

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

    const response2 = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_APP_SECRET}&access_token=${shortLived.access_token}`
    );
    const longLived = await response2.json();

    const response3 = await fetch(
      `https://graph.instagram.com/me/?fields=username&access_token=${longLived.access_token}`
    );

    const userProfile = await response3.json();

    const session = await apiGetSession({ req });
    if (session?.email) {
      const { rawData } = await apiGetUserInfoFromEmail(session.email);

      const params = {
        instagram_id: shortLived.user_id,
        username: userProfile.username,
        profile_img: '',
        access_token: longLived.access_token,
        user_id: rawData.user_id,
      };

      await db(
        // すでにデータが有れば上書きする（作動している？）
        `INSERT INTO instagram_accounts SET ? ON DUPLICATE KEY UPDATE ?`,
        [params, params]
      );

      // DBの要再連携フラブをオフにする
      await apiInstagramAccountsReconnectNeeded({
        instagram_id: shortLived.user_id,
        user_id: rawData.user_id,
        is_reconnect_needed: false,
      });

      res.writeHead(302, { Location: `/` });
      res.end();
    } else {
      throw `instagram_accounts/get_token: セッションがありません`;
    }
  } catch (err) {
    console.log(
      '/instagram_accounts/get_token/のエラーは ' + JSON.stringify(err)
    );
    res.writeHead(302, { Location: `/` });
    res.end();
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

export default get_token;
