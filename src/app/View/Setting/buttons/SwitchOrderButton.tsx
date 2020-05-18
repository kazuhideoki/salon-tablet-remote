import React from 'react'
import { useSwitchOrder } from "../../../ActionCreator/footerItems/useSwitchOrder";
import { SwapHorizontalCircleOutlined } from "@material-ui/icons";
import { IconButton } from '@material-ui/core';

type Type = {
  position: string
  params: SwitchOrderParams
}
export type SwitchOrderParams = {
  footer_item_id: number;
  order: number;
};


export const SwitchOrderButton = (props: Type) => {

  const switchOrder = useSwitchOrder();

  return (
    <IconButton
      className={props.position}
      onClick={() => switchOrder(props.params)}
    >
      <SwapHorizontalCircleOutlined />
    </IconButton>
  );
}
