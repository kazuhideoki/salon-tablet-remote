import React from 'react'
import { IconButton } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import { useGetSinglePost } from "../../Store/articles/articlesActionCreator";
import { Store, TArticle, FooterItem } from "../../Store/Store";
import Editor from '../ArticleEditor';
import { EditorContext } from '../../Store/EditorContext';
import { HandleOnUpDate } from '../../PMain';

type Type = {
  position: string
  params: TArticle | FooterItem
  handleOnClick: HandleOnUpDate 
}

export const UpdatePostButton = (props: Type) => { 

    return (
      <IconButton
        className={props.position}
        onClick={() => props.handleOnClick(props.params)}
      >
        <EditTwoTone />
      </IconButton>
    );
};

