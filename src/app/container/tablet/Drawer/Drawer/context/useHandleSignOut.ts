import React from 'react';
import { useAuth } from '../../../../../../util/auth/AuthProvider';
export const useHandleSingOut = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const { signout } = useAuth();

  const handleSignOut = () => {
    const signOuting = confirm('サインアウトしますか？');
    if (signOuting) {
      setIsClicked(true);
      signout('/');
      setIsClicked(false);
    }
  };

  return { isClicked, handleSignOut };
};
