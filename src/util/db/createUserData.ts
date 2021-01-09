import { apiCreateSampleData } from '../../pages/api/create_sample_data';
import { apiUserInfoCreate } from '../../pages/api/user_info/create';
import { apiCreatePublicPageSlug } from '../../pages/api/user_info/create_public_page_slug';
import { apiGetUserInfoFromEmail } from '../../pages/api/user_info/get';
import { apiIsFirsSigninFalse } from '../../pages/api/user_info/is_first_signin_false';

export const createUserData = async (email: string): Promise<void> => {
  try {
    await apiUserInfoCreate({
      user_email: email,
    });

    const data = await apiGetUserInfoFromEmail(email);
    const { user_id } = data.rawData;

    await apiCreateSampleData({ user_id });

    await apiCreatePublicPageSlug({
      user_id,
    });

    // 最後にis_first_sign_inのフラグをオフにする
    await apiIsFirsSigninFalse({ user_id });
  } catch (err) {
    throw `createUserData: ${err}`;
  }
};
