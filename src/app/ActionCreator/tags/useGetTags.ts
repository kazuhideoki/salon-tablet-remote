import React from "react";
import { apiTagsGet } from "../../../pages/api/tags/get";
import { TagsContext } from "../../Store/tags/Context";
import { set } from "../../Store/tags/actions";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { isLoadingTags } from "../../Store/appState/actions";

export const useGetTags = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchTags } = React.useContext(TagsContext)

  return async () => {

    dispatchAppState(isLoadingTags(true))

    const data = await apiTagsGet(userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      dispatchAppState(isLoadingTags(false));
    } else {
      dispatchAppState(isLoadingTags(false));
      dispatchTags(set(data))
    }
  };
};
