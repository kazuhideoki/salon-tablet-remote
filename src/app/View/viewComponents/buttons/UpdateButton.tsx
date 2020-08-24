import React from 'react'
import { IconButton, makeStyles, createStyles } from "@material-ui/core";
import { EditTwoTone } from "@material-ui/icons";
import { StyledIconButtonEditButton } from "./EditButtonsBox";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       padding: theme.spacing(1),
//     },
//   })
// );

type Type = {
  // 記事とアイテムで共有するのでonClickまるごと渡す
  onClick: any
  value?: any
}

export const UpdateButton = (props: Type) => { 
    // const classes = useStyles()

    const handleOnClick = (e) => {
      e.stopPropagation()
      props.onClick(props.value)
    }

    return (
      <StyledIconButtonEditButton onClick={(e) => handleOnClick(e)}>
        <EditTwoTone />
      </StyledIconButtonEditButton>
    );
};

