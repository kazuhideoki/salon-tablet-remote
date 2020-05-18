import React from 'react'
import { IconButton } from '@material-ui/core'
import { DeleteForeverTwoTone } from "@material-ui/icons";
import { useDeleteArticle } from "../../Store/articles/articlesActionCreator";

type Type = {
  position: string
  id: number
  handleOnClick: (id: number) => void // confirm + deleteArticle 
}

export const DeleteArticleButton = (props: Type) => {

    return (
      <IconButton
        className={props.position}
        onClick={() => props.handleOnClick(props.id)}
      >
        <DeleteForeverTwoTone />
      </IconButton>
    );
};
