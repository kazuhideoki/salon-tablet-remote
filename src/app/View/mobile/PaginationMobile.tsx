import React from 'react'
import { HomeButton } from '../PFooter/Pagination/HomeButton'
import { PaginationArrows } from '../PFooter/Pagination/PaginationArrows'
import { makeStyles,createStyles,Theme } from '@material-ui/core';
import { ThemeContext } from '../../Store/ThemeContext';

const useStyles = makeStyles((theme: Theme) => {
  const themes = React.useContext(ThemeContext);
  return createStyles({
    root: {
      flexGrow: 0,
    },
    icon: {
        fontSize: themes.iconSmall,
    },
    nums: {
        fontSize:  themes.iconSmall * 0.7,
        border: "none",
        backgroundColor: "transparent",
        margin: "auto 10px",
    },
    numsCurrent: {
        fontWeight: "bold",
    },
    disable: {
        color: "whitesmoke",
    },
    pagination: {
        display: "flex",
        justifyContent: "center",
        // width: 400,
    },
  })
})

export const PaginationMobile = () => {
  // const { page, pageCount, getArticles } = usePPaginationProps()
  const classes = useStyles()

  return( 
    <div className={classes. root}>
      {/* <HomeButton classes={classes} /> */}
      <PaginationArrows classes={classes} />
    </div>
  )
}
