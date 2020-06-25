import React from "react";
import {
  Store,
} from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";
import { useCheckPassword } from "./useCheckPassword";
import { signout } from "next-auth/client";

export const useDeleteUser = () => {
  const { userInfo } = React.useContext(Store)
  const {user_email, user_id} = userInfo
  const checkPassword = useCheckPassword()

  return async ({ email, password }) => {

    // メールアドレスが違う場合その時点で弾く
    if (user_email !== email) {
      alert('メールアドレスが間違っています')
    } else {
      const result = await checkPassword(password);
  
      if (result === false){
        alert("パスワードが間違っています");

      } else if(result === true) {
        // ここにアカウント削除処理実装
        const res = await fetch(
          `${location.protocol}//${location.host}/api/user_info/delete`,  
          {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            mode: "cors",
            body: JSON.stringify(user_id),
          }
        );
        const data = await res.json();

        if (data.err === true) {
          alert("削除できませんでした");
        } else {
          // ↓signout()が先、alertが後で正しく動作した
          signout()        
          alert('アカウントを削除しました。')
        }

      }

    }


  };
};
