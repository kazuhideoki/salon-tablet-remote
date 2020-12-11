import React from 'react'
import { useSwitchOrder, TUseSwitchOrders } from "../../../ActionCreator/footerItems/useSwitchOrder";
import { SwapHorizontalCircleOutlined } from "@material-ui/icons";
import { StyledIconButtonEditButton } from "./EditButtonsBox";

export type TSwitchButton = TUseSwitchOrders

export const SwitchOrderButton = (props: TSwitchButton) => {
         const switchOrder = useSwitchOrder();

         // 一番目のアイテムには必要ないので表示させない
         if (!props.smaller) {
           return null;
         }

         return (
           <StyledIconButtonEditButton
             onClick={() => {
               switchOrder({
                 smaller: props.smaller,
                 larger: props.larger,
               });
             }}
           >
             <SwapHorizontalCircleOutlined />
           </StyledIconButtonEditButton>
         );
       };
