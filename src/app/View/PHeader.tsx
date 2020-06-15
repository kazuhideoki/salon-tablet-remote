import React from 'react'
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core'
import { EditorContext } from '../Store/EditorContext'
import { Store } from '../Store/Store'



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
  const { userInfo } = React.useContext(Store)

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h5">
        {userInfo.shop_name || "Salon Tablet"}
      </Typography>
    </div>
  )
}
