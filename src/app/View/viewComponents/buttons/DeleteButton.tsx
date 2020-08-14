import React from 'react'
import { IconButton } from '@material-ui/core'
import { DeleteForeverTwoTone } from "@material-ui/icons";
import { StyledIconButton } from './EditButtonsBox';

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
      <StyledIconButton
        onClick={(e) => handleOnClick(e)}
      >
        <DeleteForeverTwoTone />
      </StyledIconButton>
    );
};
