import React from 'react'
import { apiUserInfoSwitchGeneratePublicPage } from "../../../../../../pages/api/user_info/switch_generate_public_page";
import { Store } from "../../../../../Store/Store";

export const useHandleSwitch = () => {

  const { appState, dispatchAppState } = React.useContext(Store);
  const { userInfo } = appState;

  return async (e: React.ChangeEvent<HTMLInputElement>) => {

    const result = await apiUserInfoSwitchGeneratePublicPage({
      is_generate_public_page: e.target.checked,
      user_id: userInfo.user_id,
    });
  
    dispatchAppState({
      type: "SET_IS_GENERATE_PUBLIC_PAGE",
      payload: { is_generate_public_page: result.is_generate_public_page },
    });
  }
};
