import React from "react";
import { T_instagram_id } from "../../Store/Types";
import { useGetInstagramAccounts } from "./useGetInstagramAccounts";
import { apiInstagramAccountsDelete } from "../../../pages/api/instagram_accounts/delete";
import { InstagramContext } from "../../Store/instagram/Context";
import { removeMedias } from "../../Store/instagram/actions";
import { AppStateContext } from "../../Store/appState/Context";
import { useManageInstagramAccountsProps } from "../../View/tablet/Drawer/ManageInstagramAccounts/view/ManageInstagmaAccounts";

export const useDeleteInstagramAccount = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)
  const { dispatchInstagram } = React.useContext(InstagramContext);
  const { handleLoadingInstagramAccounts } = useManageInstagramAccountsProps()

  const getInstagramAccounts = useGetInstagramAccounts();
  return async (instagram_id: T_instagram_id): Promise<void> => {
    const deleting = confirm("本当に削除してよろしいですか？");

    if (deleting === false) {
      return null;
    }

    handleLoadingInstagramAccounts(true)

    const data = await apiInstagramAccountsDelete({ instagram_id });

    if (data.err === true) {
      alert("削除できませんでした");
      handleLoadingInstagramAccounts(false)
    } else {
      dispatchAppState({ type: "DELETE_INSTAGRAM_MEDIAS" });
      dispatchInstagram(removeMedias())

      getInstagramAccounts();
    }
  };
};
