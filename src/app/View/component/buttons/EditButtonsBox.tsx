import React from 'react'
import { makeStyles,createStyles } from '@material-ui/core'

type props = {
  className: string
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "nowrap",
    }
  })
)

export const EditButtonsBox:React.FC<props> = (props) => {
  const classes = useStyles()

  return (
    <div className={`${classes.root} ${props.className}`}>
      {props.children}
    </div>
  )
}
