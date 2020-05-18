import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Pagination as MPagination, PaginationItem} from '@material-ui/lab';
import { Store } from '../Store/Store';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

const Link = () => {

  return(
    <div id='Link'>

    </div>
  )
}

// Material - uiのPaginationを途中まで試したがuseGetとの結びつけが難しそうで中断
export const Pagination = () => {
  const classes = useStyles();
  const {paginationParams} = React.useContext(Store)

  // この中にpaginationの処理を書く
  const renderItem = (item) => {
    
    return (
      <PaginationItem {...item}/>
  )}


  return (
    <div className={classes.root}>
      <MPagination
        // ↓設定が済んだらこちらで
        // count={paginationParams.pageCount}
        count={3}
        variant="outlined"
        // renderItem={(item) => (
        //   <PaginationItem
        //     component={Link}
        //     to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
        //     {...item}
        //   />
        // )}
        renderItem={(item) => renderItem(item)}
      />

    </div>
  )
}
