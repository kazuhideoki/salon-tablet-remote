import React from "react";
import { T_instagram_id } from "../../Store/Types";
import { useGetInstagramAccounts } from "./useGetInstagramAccounts";
import { Store } from "../../Store/Store";

export const useDeleteInstagramAccount = () => {
  const getInstagramAccounts = useGetInstagramAccounts();
  const { paginationParams, instagramAccounts } = React.useContext(Store);
  return async (instagram_id: T_instagram_id) => {
    const res = await fetch(
      `${location.protocol}//${location.host}/api/instagram_accounts/delete`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ instagram_id }),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("削除できませんでした");
    } else {
      getInstagramAccounts();
    }
  };
};
