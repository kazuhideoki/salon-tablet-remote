import React from 'react'
import { IconButton, makeStyles, createStyles } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import { StyledIconButtonEditButton } from "./EditButtonsBox";

export type TUpdateButton = {
  // 記事とアイテムで共有するのでonClickまるごと渡す
  onClick: any;
  value?: any;
}; 

export type Props = TUpdateButton & {
  closeBox: () => void;
};

export const UpdateButton = (props: Props) => {
         // const classes = useStyles()

         const handleOnClick = (e) => {
           e.stopPropagation();
           if (props.value) {
             props.closeBox()
             props.onClick(props.value);
           } else {
             props.closeBox()
             props.onClick();
           }
         };

         return (
           <StyledIconButtonEditButton onClick={(e) => handleOnClick(e)}>
             <EditTwoTone />
           </StyledIconButtonEditButton>
         );
       };

