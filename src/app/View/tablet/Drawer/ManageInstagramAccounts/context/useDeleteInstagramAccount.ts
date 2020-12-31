import React from "react";
import { T_instagram_id } from "../../../../../Store/Types";
import { useGetInstagramAccounts } from "./lib/useGetInstagramAccounts";
import { apiInstagramAccountsDelete } from "../../../../../../pages/api/instagram_accounts/delete";
import { InstagramContext } from "../../../../../Store/instagram/Context";
import { removeMedias } from "../../../../../Store/instagram/actions";
import { AppStateContext } from "../../../../../Store/appState/Context";
import { isLoadingInstagramAccounts, isShowInstagram } from "../../../../../Store/appState/actions";

export const useDeleteInstagramAccount = () => {
  const { dispatchAppState } = React.useContext(AppStateContext)
  const { dispatchInstagram } = React.useContext(InstagramContext);

  const getInstagramAccounts = useGetInstagramAccounts();
  return async (instagram_id: T_instagram_id): Promise<void> => {
    const deleting = confirm("本当に削除してよろしいですか？");

    if (deleting === false) {
      return null;
    }

    dispatchAppState(isLoadingInstagramAccounts(true))

    try {
      await apiInstagramAccountsDelete({ instagram_id });
      dispatchAppState(isShowInstagram(false));
      dispatchInstagram(removeMedias())
  
      getInstagramAccounts();
    } catch (err) {
      alert("削除できませんでした");
      dispatchAppState(isLoadingInstagramAccounts(false))

    }
  }
}
