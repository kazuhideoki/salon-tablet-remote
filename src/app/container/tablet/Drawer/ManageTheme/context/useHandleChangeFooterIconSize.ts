import React from 'react';
import { useChangeFooterIconSize } from '../../../../../hooks/userInfo/useChangeFooterIconSize';
import { FooterIconSize } from '../../../../../../util/interface/Interface';
import { UserInfoContext } from '../../../../../stores/userInfo/Context';

export const useHandleChangeFooterIconSize = () => {
  const { userInfo } = React.useContext(UserInfoContext);
  const [footerIconSize, setFooterIconSize] = React.useState(
    userInfo.footer_icon_size
  );
  const changeFooterIconSize = useChangeFooterIconSize();

  const handleChangeFooterIconSize = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    try {
      await changeFooterIconSize(event.target.value as FooterIconSize);
      setFooterIconSize(event.target.value as FooterIconSize);
    } catch (err) {
      console.log(`handleChangeFooterIconSize: ${err}`);
    }
  };

  return { footerIconSize, handleChangeFooterIconSize };
};
