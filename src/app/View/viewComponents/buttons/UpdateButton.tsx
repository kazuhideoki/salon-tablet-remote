import React from 'react'
import { IconButton } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";

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

