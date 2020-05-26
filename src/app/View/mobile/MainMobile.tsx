import React from 'react'
import { sqlToDate } from '../../ActionCreator/organizeSql/sqlToDate';
import { usePMainProps } from '../PMain/PMain';
import { makeStyles,createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => {
  // const themes = React.useContext(ThemeContext);
  return createStyles({
    root: {
      overflowY: "scroll",
    },
    item: {
      border: '1px solid black',
    }
  })
})

export const MainMobile = () => {
  const classes = useStyles()
  const {
    appState,
    articles,
    handleOnUpDate,
    handleOnDelete,
    openArticle,
  } = usePMainProps();

  return (
    <div className={classes.root}>
      {articles.map((value, key) => {
        return (
          <div className={classes.item}>
            <div>{value.title}</div>
            <div>{sqlToDate(value.created_at)}</div>
            <div>{value.article_excerpt}...</div>
            <button onClick={() => handleOnUpDate(value.id)}>編集</button>
            <button onClick={() => handleOnDelete(value.id)}>削除</button>
          </div>
        );
      })}
    </div>
  );
}
