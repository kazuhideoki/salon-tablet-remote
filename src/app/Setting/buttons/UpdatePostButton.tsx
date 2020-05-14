import React from 'react'
import { IconButton } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import { useGetSinglePost } from "../../Store/articles/articlesActionCreator";
import { Store, TArticle, FooterItem, T_footer_item_id, T_id } from "../../Store/Store";
import Editor from '../ArticleEditor';
import { EditorContext } from '../../Store/EditorContext';
import { HandleOnUpDate } from '../../PMain';
import { HandleOnUpDateFooterIcon } from "../../PFooter/PFooter";

type Type = {
  position: string
  id: T_id | T_footer_item_id
  handleOnClick: HandleOnUpDate | HandleOnUpDateFooterIcon
}

export const UpdatePostButton = (props: Type) => { 

    return (
      <IconButton
        className={props.position}
        onClick={() => props.handleOnClick(props.id)}
      >
        <EditTwoTone />
      </IconButton>
    );
};

