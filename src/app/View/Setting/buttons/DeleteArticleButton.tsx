import React from 'react'
import { IconButton } from '@material-ui/core'
import { DeleteForeverTwoTone } from "@material-ui/icons";

type Type = {
  position: string
  // id: number
  // handleOnClick: (id: number) => void // confirm + deleteArticle 
  onClick: any
}

export const DeleteArticleButton = (props) => {

    return (
      <IconButton className={props.position} onClick={() => props.onClick()}>
        <DeleteForeverTwoTone />
      </IconButton>
    );
};
