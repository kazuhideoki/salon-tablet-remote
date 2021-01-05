import { db } from '../../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { TApiResponse } from '../../../../util/db/apiWrap';
import { TThemeParams } from '../../../../app/store/theme/ThemeProvider';
import { apiWrapPost } from '../../../../util/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoChangeTheme = async (
  params: ApiUserInfoChangeTheme
): Promise<TApiResponse> => {
  return apiWrapPost('user_info/theme/change_theme', params);
};

export type ApiUserInfoChangeTheme = {
  user_id: number;
  themeParams: TThemeParams;
};

const change_theme = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    const { user_id, themeParams }: ApiUserInfoChangeTheme = req.body;

    try {
      await db(`UPDATE user_info SET ? where user_id = ?`, [
        themeParams,
        user_id,
      ]);

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/user_info/change_theme/のエラーは ' + JSON.stringify(err));
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

export default change_theme;
