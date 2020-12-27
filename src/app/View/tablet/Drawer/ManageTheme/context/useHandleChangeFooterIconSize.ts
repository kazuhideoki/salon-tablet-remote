import React from 'react'
import { useChangeFooterIconSize } from "../../../../../ActionCreator/user/useChangeFooterIconSize";
import { Store } from '../../../../../Store/Store';
import { T_footer_icon_size } from "../../../../../Store/Types";

export const useHandleChangeFooterIconSize = () => {
  const { appState } = React.useContext(Store);
  const [footerIconSize, setFooterIconSize] = React.useState(appState.userInfo.footer_icon_size);
  const changeFooterIconSize = useChangeFooterIconSize();

  const handleChangeFooterIconSize = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const isChanged = await changeFooterIconSize(
      event.target.value as T_footer_icon_size
    );
    if (isChanged) {
      setFooterIconSize(event.target.value as T_footer_icon_size);
    }
  };

  return { footerIconSize, handleChangeFooterIconSize };
}