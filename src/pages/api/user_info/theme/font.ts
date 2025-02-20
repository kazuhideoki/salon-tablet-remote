import { db } from '../../../../util/db/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { ThemeFont } from '../../../../util/interface/Interface';
import { ApiResponse } from '../../../../util/db/apiWrap';
import { apiWrapPost } from '../../../../util/db/apiWrap';

export const apiUserInfoThemeFont = async (
  params: ApiUserInfoThemeFont
): Promise<ApiResponse> => {
  return apiWrapPost('user_info/theme/font', params);
};

export type WhichFont = 'theme_font1' | 'theme_font2' | 'theme_font_heading';

export type ApiUserInfoThemeFont = {
  user_id: number;
  theme_font: ThemeFont;
  whichFont: WhichFont;
};

const font = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { user_id, theme_font, whichFont }: ApiUserInfoThemeFont = req.body;

    try {
      await db(`UPDATE user_info SET ${whichFont} = ? where user_id = ?`, [
        theme_font,
        user_id,
      ]);

      res.status(200).json({ err: false, rawData: null } as ApiResponse);
    } catch (err) {
      console.log('/user_info/theme/font/のエラーは ' + JSON.stringify(err));
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

export default font;
