import { db } from '../../../../lib/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { T_user_id, T_theme_font } from '../../../../app/Store/Interface';
import { TApiResponse } from '../../../../lib/db/apiWrap';
import { apiWrapPost } from '../../../../lib/db/apiWrap';

// サーバーサイドとフロントサイド考えずに使えるようにラップする
export const apiUserInfoThemeFont = async (
  params: T_user_info_theme_font
): Promise<TApiResponse> => {
  return apiWrapPost('user_info/theme/font', params);
};

export type TWhichFont = 'theme_font1' | 'theme_font2' | 'theme_font_heading';

export type T_user_info_theme_font = {
  user_id: T_user_id;
  theme_font: T_theme_font;
  whichFont: TWhichFont;
};

const font = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { user_id, theme_font, whichFont }: T_user_info_theme_font = req.body;

    try {
      await db(`UPDATE user_info SET ${whichFont} = ? where user_id = ?`, [
        theme_font,
        user_id,
      ]);

      res.status(200).json({ err: false, rawData: null } as TApiResponse);
    } catch (err) {
      console.log('/user_info/theme/font/のエラーは ' + JSON.stringify(err));
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

export default font;
