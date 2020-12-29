import React from "react";
import { Store } from "../../Store/Store";
import { apiUserInfoUpdate, T_user_info_update } from "../../../pages/api/user_info/update";
import { updatePassword } from "../../../lib/auth/updatePassword";
import { useAuth } from "../../../lib/auth/AuthProvider";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { update } from "../../Store/userInfo/actions";

export type TUpdateUser = {
  name: string
  shopName: string
  email: string
  password: string
  isShowMobile: boolean
}

export const useUpdateUser = () => {
  const {
    dispatchAppState,
    appState,
  } = React.useContext(Store);
  const { userInfo, dispatchUserInfo } = React.useContext(UserInfoContext);
  const { user_id } = userInfo
  const {user} = useAuth()

  return async (param: TUpdateUser) => {
    const params: T_user_info_update = {
      user_id: user_id,
      user_name: param.name,
      shop_name: param.shopName,
      user_email: param.email,
      is_generate_public_page: param.isShowMobile,
    };

    try {

      const data = await apiUserInfoUpdate(params);
      
      // パスワード変更 firebaseで ここ
      if (param.password.length) await updatePassword({password: param.password, user})
      
      dispatchAppState({
        type: "SET_USER_INFO",
      });
      dispatchUserInfo(update(params))

      alert("ユーザーデータを更新しました。");
  
    } catch (err) {
      console.log('useUpdateUserでエラー ' + err);
    }

  };
};
