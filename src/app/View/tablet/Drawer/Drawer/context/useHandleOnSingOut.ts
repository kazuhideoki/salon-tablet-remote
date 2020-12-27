import React from 'react'
import { useAuth } from '../../../../../../lib/auth/AuthProvider';
export const useHandleOnSingOut = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const { signout } = useAuth();

  const handleOnSignOut = () => {
    const signOuting = confirm('サインアウトしますか？')
    if(signOuting) {
      setIsClicked(true)
      signout("/");
      setIsClicked(false);
    }
  }

  return { isClicked, handleOnSignOut };
}