import React from "react";
import {
  Store,
} from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";

export const useDeleteUser = () => {
  const { user } = React.useContext(Store);
  const id = user.user_id

  return async () => {
    const res = await fetch(
      `${location.protocol}//${location.host}/articles/delete`, //★要変更
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ id }),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("削除できませんでした");
    } else {
     
    }
  };
};
