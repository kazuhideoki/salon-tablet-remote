import React from 'react'
import { HomeButton } from '../Footer/Pagination/HomeButton'
import { PaginationArrows } from '../Footer/Pagination/PaginationArrows'
import { makeStyles,createStyles,Theme } from '@material-ui/core';
import { ThemeContext } from '../../Store/ThemeContext';
import { usePPaginationProps } from '../Footer/Pagination/PPagination';
import { Home } from '@material-ui/icons';
import { TUsePPaginationProps } from "../Footer/Pagination/PPagination";

const useStyles = makeStyles((theme: Theme) => {
  const themes = React.useContext(ThemeContext);
  return createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      fontSize: themes.iconSmall * 0.7,
    },
    icons: {
      fontSize: "inherit",
    },
    icon: {
      // margin: "0 8px"
    },
    displayPage: {
      fontSize: "inherit",
    },
    paginationArrows:{

    },
    nums: {
      // fontSize: themes.iconSmall * 0.7,
      border: "none",
      backgroundColor: "transparent",
      // margin: "auto 10px",
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
  });
})

export const PaginationMobilePresenter:React.FC<TUsePPaginationProps> = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/* <Home onClick={() => props.getArticles(1)} className={classes.home} /> */}
      <PaginationArrows {...props} classes={classes} />
    </div>
  );
}

export const PaginationMobile = () => {
  const props = usePPaginationProps();

  return <PaginationMobilePresenter {...props}/>

}
