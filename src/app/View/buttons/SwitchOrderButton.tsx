import React from 'react'
import { useSwitchOrder } from "../../ActionCreator/footerItems/useSwitchOrder";
import { SwapHorizontalCircleOutlined } from "@material-ui/icons";
import { IconButton } from '@material-ui/core';

type Type = {
  params: SwitchOrderParams
}
export type SwitchOrderParams = {
  footer_item_id: number;
  order: number;
};


export const SwitchOrderButton = (props: Type) => {

  const switchOrder = useSwitchOrder();

  // 一番目のアイテムには必要ないので表示させない
  if (props.params.order === 1) {
    return null
  }

  return (
    <IconButton
      // className={props.position}
      onClick={() => switchOrder(props.params)}
    >
      <SwapHorizontalCircleOutlined />
    </IconButton>
  );
}
