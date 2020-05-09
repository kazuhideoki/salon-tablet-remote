import React from 'react'
import { IconButton } from '@material-ui/core'
import { DeleteForeverTwoTone } from "@material-ui/icons";
import { useDeletePost } from "../../Store/articles/articlesActionCreator";

type Type = {
  position: string
  id: number
  handleOnClick: (id: number) => Promise<void> //deletePost 
}

export const DeletePostButton = (props: Type) => {

    return (
      <IconButton
        className={props.position}
        onClick={() => props.handleOnClick(props.id)}
      >
        <DeleteForeverTwoTone />
      </IconButton>
    );
};
