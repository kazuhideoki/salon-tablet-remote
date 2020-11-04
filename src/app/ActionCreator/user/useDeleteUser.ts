import React from "react";
import {
  Store,
} from "../../Store/Store";
import { useCheckPassword } from "./useCheckPassword";
import { apiUserInfoDelete } from "../../../pages/api/user_info/delete";
// const { signout } = require("next-auth/client")

export const useDeleteUser = () => {
  const { appState } = React.useContext(Store);
  const { user_email, user_id } = appState.userInfo;
  const checkPassword = useCheckPassword()

  return async ({ email, password }) => {

    const deleting = confirm("本当に削除してよろしいですか？");

    if (deleting === false) {
      return null;
    }

    // メールアドレスが違う場合その時点で弾く
    if (user_email !== email) {
      alert('メールアドレスが間違っています')
    } else {
      const result = await checkPassword(password);
  
      if (result === false){
        alert("パスワードが間違っています");

      } else if(result === true) {
        // ここにアカウント削除処理実装
        const data = await apiUserInfoDelete({user_id})

        if (data.err === true) {
          alert("削除できませんでした");
        } else {
          // ↓signout()が先、alertが後で正しく動作した
          // signout()        
          alert('アカウントを削除しました。')
        }

      }

    }


  };
};
