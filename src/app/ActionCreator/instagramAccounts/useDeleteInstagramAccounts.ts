import React from "react";
import { T_instagram_id } from "../../Store/Types";
import { useGetInstagramAccounts } from "./useGetInstagramAccounts";
import { Store } from "../../Store/Store";
import { apiInstagramAccountsDelete } from "../../../pages/api/instagram_accounts/delete";

export const useDeleteInstagramAccount = () => {
  const { dispatchAppState } = React.useContext(Store)
  const getInstagramAccounts = useGetInstagramAccounts();
  return async (instagram_id: T_instagram_id) => {

    const deleting = confirm("本当に削除してよろしいですか？");

    if (deleting === false) {
      return null;
    }

    const data = await apiInstagramAccountsDelete({ instagram_id });

    if (data.err === true) {
      alert("削除できませんでした");
    } else {
      dispatchAppState({type: 'DELETE_INSTAGRAM_MEDIAS'})
      getInstagramAccounts();
    }
  };
};
