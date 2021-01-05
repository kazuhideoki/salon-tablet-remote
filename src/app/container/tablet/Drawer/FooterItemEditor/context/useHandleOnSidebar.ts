import React from 'react';
import { FooterItem } from '../../../../../store/Interface';
export const useHandleOnSidebar = (
  isEditting: boolean,
  footerItem: FooterItem
) => {
  const initSidebar = () => {
    if (isEditting === false) {
      return false;
    }
    if (footerItem.order_sidebar === 0) {
      return false;
    }
    return true;
  };

  const [onSidebar, setOnSidebar] = React.useState(initSidebar());

  const handleOnSidebar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnSidebar(e.target.checked);
  };

  return {
    onSidebar,
    handleOnSidebar,
  };
};
