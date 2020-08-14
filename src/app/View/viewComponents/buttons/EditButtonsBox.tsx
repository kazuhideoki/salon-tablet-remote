import React from 'react'
import { makeStyles,createStyles, withStyles, IconButton } from '@material-ui/core'

type props = {
  className: string
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "nowrap",
      // gap: `${theme.spacing(1)}px`,
      borderRadius: theme.spacing(3),
      boxShadow: theme.shadows[3],
      backgroundColor: "rgba(255,255,255,0.8)",
      border: "2px solid",
    },
  })
);

export const StyledIconButtonEditButton = withStyles({
  root: {
    padding: 8,
    margin: "0 4px",
  }
})(IconButton)

export const EditButtonsBox:React.FC<props> = (props) => {
  const classes = useStyles()

  return (
    <div className={`${classes.root} ${props.className}`}>
      {props.children}
    </div>
  )
}
