import React from 'react'
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core'
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

export const Header = () => {
  const classes = useStyles()
  const { appState } = React.useContext(Store)

  return (
    <div className={classes.root}>
      <Typography align="center" variant="h5">
        {appState.userInfo.shop_name || "SALON TABLET"}
      </Typography>
    </div>
  )
}
