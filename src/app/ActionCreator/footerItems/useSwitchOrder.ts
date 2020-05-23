import React from "react";
import { SwitchOrderParams } from "../../View/buttons/SwitchOrderButton";
import { useGetFooterItems } from "./useGetFooterItems";

export const useSwitchOrder = () => {
  const getFooterItems = useGetFooterItems();

  return async (params: SwitchOrderParams) => {
    console.log("useSwitchOrderのparamsは " + params);

    const res = await fetch(
      `${location.protocol}//${location.host}/footer_items/switchOrder`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );
    const data = await res.json();

    if (data.err === true) {
      alert("アイテムを入れ替えることができませんでした");
    } else {
      getFooterItems();
    }
  };
};
