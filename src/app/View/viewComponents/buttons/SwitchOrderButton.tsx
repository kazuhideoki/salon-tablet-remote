import React from 'react'
import { useSwitchOrder, TUseSwitchOrders } from "../../../ActionCreator/footerItems/useSwitchOrder";
import { SwapHorizontalCircleOutlined } from "@material-ui/icons";
import { IconButton } from '@material-ui/core';
import { T_footer_items_switch_order } from '../../../../pages/api/footer_items/switch_order';
import { StyledIconButtonEditButton } from "./EditButtonsBox";
import { FooterItem } from '../../../Store/Types';

export const SwitchOrderButton = ({
         smaller,
         larger,
       }:TUseSwitchOrders) => {
         const switchOrder = useSwitchOrder();

         // 一番目のアイテムには必要ないので表示させない
         if (!smaller) {
           return null;
         }

         return (
           <StyledIconButtonEditButton
             // className={props.position}
             onClick={() =>
               switchOrder({
                 smaller,
                 larger,
               })
             }
           >
             <SwapHorizontalCircleOutlined />
           </StyledIconButtonEditButton>
         );
       };
