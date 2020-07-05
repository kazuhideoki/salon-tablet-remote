import React from 'react'
import { IconButton } from '@material-ui/core'
import { DeleteForeverTwoTone } from "@material-ui/icons";

type Type = {
  // 記事とアイテムで共有するのでonClickまるごと渡す
  onClick: any
}

export const DeleteButton = (props) => {

    return (
      <IconButton
        onClick={() => props.onClick()}
      >
        <DeleteForeverTwoTone />
      </IconButton>
    );
};
