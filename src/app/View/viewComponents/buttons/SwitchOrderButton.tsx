import React from 'react'
import { useSwitchOrder } from "../../../ActionCreator/footerItems/useSwitchOrder";
import { SwapHorizontalCircleOutlined } from "@material-ui/icons";
import { IconButton } from '@material-ui/core';
import { T_footer_items_switch_order } from '../../../../pages/api/footer_items/switch_order';


export const SwitchOrderButton = (props: T_footer_items_switch_order) => {

  const switchOrder = useSwitchOrder();

  // 一番目のアイテムには必要ないので表示させない
  if (props.order === 1) {
    return null
  }

  return (
    <IconButton
      // className={props.position}
      onClick={() => switchOrder(props)}
    >
      <SwapHorizontalCircleOutlined />
    </IconButton>
  );
}
