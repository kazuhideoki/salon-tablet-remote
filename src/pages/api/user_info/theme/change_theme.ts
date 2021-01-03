import { db } from '../../../../lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { T_user_id } from '../../../../app/Store/Interface';
import { TApiResponse } from '../../../../lib/apiWrap';
import { TThemeParams } from '../../../../app/Store/theme/ThemeProvider';
import { apiWrapPost } from '../../../../lib/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoChangeTheme = async (
  params: T_user_info_change_theme
): Promise<TApiResponse> => {
  return apiWrapPost('user_info/theme/change_theme', params);
};

export type T_user_info_change_theme = {
  user_id: T_user_id;
  themeParams: TThemeParams;
};

const change_theme = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { user_id, themeParams }: T_user_info_change_theme = req.body;

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

// socketうんぬんの エラーメッセージを表示させないようにする
// jsonのパーサー
export const config = {
  api: {
    externalResolver: true,
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

export default change_theme;
