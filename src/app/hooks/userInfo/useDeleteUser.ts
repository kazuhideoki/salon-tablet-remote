import React from 'react';
import { apiUserInfoDelete } from '../../../pages/api/user_info/delete';
import { useAuth } from '../../../util/auth/AuthProvider';
import { deleteUserInFirebase } from '../../../util/auth/deleteUserInFirebase';
import { UserInfoContext } from '../../stores/userInfo/Context';

export const useDeleteUser = (): ((
  email: string,
  password: string
) => Promise<void>) => {
  const { userInfo } = React.useContext(UserInfoContext);
  const { user_email, user_id } = userInfo;
  const { signout } = useAuth();

  return async (email: string, password: string): Promise<void> => {
    const deleting = confirm('本当に削除してよろしいですか？');

    if (deleting === false) {
      return;
    }
    if (email !== user_email) {
      alert('メールアドレスが間違っています。');
      return;
    }

    try {
      await deleteUserInFirebase(password);
      console.log('deleteUserInFirebase完了');

      await apiUserInfoDelete({ user_id });
      console.log('apiUserInfoDelete完了');

      signout('/');
      alert('アカウントを削除しました。');
    } catch (err) {
      alert(`useDeleteUser: ${err}`);
    }
  };
};
