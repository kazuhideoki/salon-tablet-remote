import React from 'react'
import { IconButton } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import { T_footer_item_id, T_id } from "../../../Store/Store";
import { HandleOnUpDate } from '../../PMain/PMain';

type Type = {
  position: string
  // id: T_id | T_footer_item_id
  // handleOnClick: HandleOnUpDate | HandleOnUpDateFooterIcon
  onClick: any
}

export const UpdateArticleButton = (props: Type) => { 

    return (
      <IconButton
        className={props.position}
        onClick={() => props.onClick()}
      >
        <EditTwoTone />
      </IconButton>
    );
};

