import React from 'react';
import {
  apiUserInfoUpdate,
  ApiUserInfoUpdate,
} from '../../../pages/api/user_info/update';
import { updatePasswordInFirebase } from '../../../util/auth/updatePassword';
import { useAuth } from '../../../util/auth/AuthProvider';
import { UserInfoContext } from '../../store/userInfo/Context';
import { update } from '../../store/userInfo/actions';
import { AppStateContext } from '../../store/appState/Context';
import { closeModal } from '../../store/appState/actions';

export type TUpdateUser = {
  name: string;
  shopName: string;
  email: string;
  password: string;
  isShowMobile: boolean;
};

export const useUpdateUser = (param: TUpdateUser) => {
  const { dispatchAppState, appState } = React.useContext(AppStateContext);
  const { userInfo, dispatchUserInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo;
  const { user } = useAuth();

  return async () => {
    const params: ApiUserInfoUpdate = {
      user_id: user_id,
      user_name: param.name,
      shop_name: param.shopName,
      user_email: param.email,
      is_generate_public_page: param.isShowMobile,
    };

    try {
      // パスワード変更 firebaseで ここ
      if (param.password.length && user) {
        await updatePasswordInFirebase({ password: param.password, user });
      }

      await apiUserInfoUpdate(params);

      dispatchUserInfo(update(params));
      dispatchAppState(closeModal());

      alert('ユーザーデータを更新しました。');
    } catch (err) {
      console.log(`useUpdateUser: ${err}`);
    }
  };
};
