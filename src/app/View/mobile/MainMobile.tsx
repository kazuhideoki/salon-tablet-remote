import React from 'react'
import { sqlToDate } from '../../ActionCreator/organizeSql/sqlToDate';
import { usePMainProps } from '../PMain/PMain';
import { makeStyles,createStyles, Theme, Button } from '@material-ui/core';
import { useDrawerProps } from '../Drawer';

const useStyles = makeStyles((theme: Theme) => {
  // const themes = React.useContext(ThemeContext);
  return createStyles({
    root: {
      overflowY: "scroll",
      flexGrow: 1,
      width: "100%",
    },
    button: {
      width: "100%",
    },
    item: {
      border: "1px solid black",
    },
    itemIsDraft: {
      border: "1px solid red",
    },
  });
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

  const { handleOpenArticleEditor } = useDrawerProps()

  return (
    <div className={classes.root}>
      <Button color="primary" className={classes.button} onClick={() => handleOpenArticleEditor()}>新規投稿</Button>
      {articles.length === 0
      ? <div className={classes.item}>記事がありません</div>

      : articles.map((value, key) => {
        return (
          <div
            key={key}
            className={`${
              value.is_published ? classes.item : classes.itemIsDraft
            }`}
          >
            <div>タイトル:{value.title}</div>
            <div>作成日:{sqlToDate(value.created_at)}</div>
            {value.updated_at ? (
              <div>編集日:{sqlToDate(value.updated_at)}</div>
            ) : null}
            <div>
              {value.article_excerpt}
              {/* 抜粋が100文字の場合"..."追加" */}
              {value.article_excerpt.length === 100 ? "..." : ""}
            </div>
            <button onClick={() => handleOnUpDate(value.article_id)}>
              編集
            </button>
            <button onClick={() => handleOnDelete(value.article_id)}>
              削除
            </button>
          </div>
        );
      })}
    </div>
  );
}
