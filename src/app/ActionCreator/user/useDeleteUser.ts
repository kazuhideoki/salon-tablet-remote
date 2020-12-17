import React from "react";
import {
  Store,
} from "../../Store/Store";
import { apiUserInfoDelete } from "../../../pages/api/user_info/delete";
import { useAuth } from "../../../lib/auth/AuthProvider";
import { deleteUserInFirebase } from "../../../lib/auth/deleteUserInFirebase";

export const useDeleteUser = () => {
  const { appState } = React.useContext(Store);
  const { user_email, user_id } = appState.userInfo;
  const { signout } = useAuth()

  return async (email: string): Promise<void> => {
    const deleting = confirm("本当に削除してよろしいですか？");

    if (deleting === false) {
      return null;
    }
    if (email !== user_email) {
      alert("メールアドレスが間違っています。");
      return null;
    }

    try {
      await apiUserInfoDelete({ user_id });

      await deleteUserInFirebase();

      signout("/");
      alert("アカウントを削除しました。");
    } catch (err) {
      alert("エラーが発生しました" + err);
    }
  };
};
