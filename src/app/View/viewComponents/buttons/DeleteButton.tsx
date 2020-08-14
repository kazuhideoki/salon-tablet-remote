import React from 'react'
import { IconButton } from '@material-ui/core'
import { DeleteForeverTwoTone } from "@material-ui/icons";
import { StyledIconButtonEditButton } from "./EditButtonsBox";

type Type = {
  // 記事とアイテムで共有するのでonClickまるごと渡す
  onClick: any
  value: any
}

export const DeleteButton = (props:Type) => {

    const handleOnClick = (e) => {
      e.stopPropagation();
      props.onClick(props.value);
    };

    return (
      <StyledIconButtonEditButton
        onClick={(e) => handleOnClick(e)}
      >
        <DeleteForeverTwoTone />
      </StyledIconButtonEditButton>
    );
};
