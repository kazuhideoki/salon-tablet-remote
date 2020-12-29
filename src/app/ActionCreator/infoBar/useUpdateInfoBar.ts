import React from "react";

import { useGetInfoBar } from "./useGetInfoBar";
import {
  T_info_bar_update,
  apiInfoBarUpdate,
} from "../../../pages/api/info_bar/update";
import { T_info_bar_type } from "../../Store/Types";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { useModalProps } from "../../View/tablet/Modal/Modal/view/Modal";

export type TUseUpdateInfoBar = {
  infoBarType: T_info_bar_type;
  editorText: string;
  articleInfoBar: number;
  ScrollingAnimationDuration: number;
};

export const useUpdateInfoBar = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { closeModal } = useModalProps();
  const getInfoBar = useGetInfoBar();

  return async (param: TUseUpdateInfoBar) => {

    closeModal()

    const params: T_info_bar_update = {
        user_id: userInfo.user_id,
        info_bar_type: param.infoBarType,
        scrolling_sentence: param.editorText,
        scrolling_animation_duration: param.ScrollingAnimationDuration,
        selected_article_id: param.articleInfoBar,
    }

    const data = await apiInfoBarUpdate(params);

    if (data.err === true) {
      alert("更新できませんでした");
      // dispatchAppState({ type: "OFF_IS_LOADING_FOOTER" });
    } else {
      closeModal()

      getInfoBar();
    }
  };
};
