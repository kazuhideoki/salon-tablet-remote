import React from 'react'
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core'



const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }
  })
})

export const PHeader = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography align="center" variant="h5">
        Salon Tablet
      </Typography>
    </div>
  )
}
