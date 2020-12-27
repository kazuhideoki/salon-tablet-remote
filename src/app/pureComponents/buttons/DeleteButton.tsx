import React from 'react'
import { IconButton } from '@material-ui/core'
import { DeleteForeverTwoTone } from "@material-ui/icons";
import { StyledIconButtonEditButton } from "./EditButtonsBox";

export type TDeleteButton = {
  // 記事とアイテムで共有するのでonClickまるごと渡す
  onClick: any;
  value: any;
}

type Props = TDeleteButton & { handleClose?: () => void }

export const DeleteButton = (props: Props) => {
         const handleOnClick = (e) => {
           props.onClick(props.value);
           props.handleClose();
         };

         return (
           <StyledIconButtonEditButton onClick={(e) => handleOnClick(e)}>
             <DeleteForeverTwoTone />
           </StyledIconButtonEditButton>
         );
       };
