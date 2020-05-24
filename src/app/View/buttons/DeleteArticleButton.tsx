import React from 'react'
import { IconButton } from '@material-ui/core'
import { DeleteForeverTwoTone } from "@material-ui/icons";

type Type = {
  position: string
  onClick: any
}

export const DeleteArticleButton = (props) => {

    return (
      <IconButton className={props.position} onClick={() => props.onClick()} style={{zIndex: 200}}>
        <DeleteForeverTwoTone />
      </IconButton>
    );
};
