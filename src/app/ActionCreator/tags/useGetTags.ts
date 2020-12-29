import React from "react";
import { apiTagsGet } from "../../../pages/api/tags/get";
import { TagsContext } from "../../Store/tags/Context";
import { set } from "../../Store/tags/actions";
import { UserInfoContext } from "../../Store/userInfo/Context";
import { AppStateContext } from "../../Store/appState/Context";
import { useManageTagsProps } from "../../View/tablet/Drawer/ManageTags/view/ManageTags";

export const useGetTags = () => {
  const { dispatchAppState } = React.useContext(AppStateContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { dispatchTags } = React.useContext(TagsContext)
  const { handleLoadingTags } = useManageTagsProps()

  return async () => {

    handleLoadingTags(true)

    const data = await apiTagsGet(userInfo.user_id);

    if (data.err === true) {
      alert("取得できませんでした");
      handleLoadingTags(false)
    } else {
      handleLoadingTags(false);
      dispatchTags(set(data))
    }
  };
};
