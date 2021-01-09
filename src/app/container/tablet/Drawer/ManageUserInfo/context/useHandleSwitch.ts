import React from 'react';
import { useSwitchGeneratePublicPage } from '../../../../../hooks/userInfo/useSwitchGeneratePublicPage';

export const useHandleSwitch = () => {
  const switchGeneratePublicPage = useSwitchGeneratePublicPage();

  return async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    try {
      await switchGeneratePublicPage(checked);
    } catch (err) {
      console.log(`useHandleSwitch: ${err}`);
    }
  };
};
