import React from 'react'
import { IconButton } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";

type Type = {
  // 記事とアイテムで共有するのでonClickまるごと渡す
  onClick: any
  value: any
}

export const UpdateButton = (props: Type) => { 

    const handleOnClick = (e) => {
      e.stopPropagation()
      props.onClick(props.value)
    }

    return (
      <IconButton onClick={(e) => handleOnClick(e)}>
        <EditTwoTone />
      </IconButton>
    );
};

