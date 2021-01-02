import { apiCreateSampleData } from '../../pages/api/create_sample_data';
import { apiUserInfoCreate } from '../../pages/api/user_info/create';
import { apiCreatePublicPageSlug } from '../../pages/api/user_info/create_public_page_slug';
import { apiGetUserInfoFromEmail } from '../../pages/api/user_info/get';
import { apiIsFirsSigninFalse } from '../../pages/api/user_info/is_first_signin_false';

export const createUserData = async (email: string): Promise<void> => {
  console.log(`createUserDataだよ email:${email}`);

  try {
    await apiUserInfoCreate({
      user_email: email,
    });
    console.log('apiUserInfoCreate完了');

    const userInfo = await apiGetUserInfoFromEmail(email);
    const { user_id } = userInfo;

    console.log(`apiGetUserInfoFromEmail完了: ${JSON.stringify(userInfo)}`);

    await apiCreateSampleData({ user_id });
    console.log('apiCreateSampleData完了');

    await apiCreatePublicPageSlug({
      user_id,
    });
    console.log('apiCreatePublicPageSlug完了');

    // 最後にis_first_sign_inのフラグをオフにする
    await apiIsFirsSigninFalse({ user_id });
  } catch (err) {
    throw `createUserData: ${err}`;
  }
};
