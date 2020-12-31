import React from 'react'
import { useSwitchOrder, TUseSwitchOrders } from "../../View/ActionCreator/footerItems/useSwitchOrder";
import { SwapHorizontalCircleOutlined } from "@material-ui/icons";
import { StyledIconButtonEditButton } from "./EditButtonsBox";

export type TSwitchButton = TUseSwitchOrders & { handleClose: () => void };

type Props = TSwitchButton & { handleClose?: () => void }


export const SwitchOrderButton = (props: Props) => {
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
               props.handleClose();
             }}
           >
             <SwapHorizontalCircleOutlined />
           </StyledIconButtonEditButton>
         );
       };
