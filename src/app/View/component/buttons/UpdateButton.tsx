import React from 'react'
import { IconButton } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import { T_footer_item_id, T_article_id } from "../../../Store/Store";
import { HandleOnUpDate } from '../../PMain/PMain';

type Type = {
  // 記事とアイテムで共有するのでonClickまるごと渡す
  onClick: any
}

export const UpdateButton = (props: Type) => { 

    return (
      <IconButton
        onClick={() => props.onClick()}
      >
        <EditTwoTone />
      </IconButton>
    );
};

