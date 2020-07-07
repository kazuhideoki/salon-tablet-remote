import React from 'react'
import { sqlToDate } from '../../ActionCreator/organizeSql/sqlToDate';
import { usePMainProps } from '../PMain/PMain';
import { makeStyles,createStyles, Theme, Button } from '@material-ui/core';
import { useDrawerProps } from '../Drawer';

export const useMainMobileProps = () => {
  const {
    appState,
    articles,
    handleOnUpDate,
    handleOnDelete,
    openArticle,
  } = usePMainProps();

  const { handleOpenArticleEditor } = useDrawerProps()

  return {
    appState,
    articles,
    handleOnUpDate,
    handleOnDelete,
    openArticle,
    handleOpenArticleEditor,
  }
}

type Props = ReturnType<typeof useMainMobileProps>

const useStyles = makeStyles((theme: Theme) => {
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
      borderRadius: 2,
      fontStyle: "italic",
    },
  });
})

export const MainMobilePresenter:React.FC<Props> = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Button color="primary" className={classes.button} onClick={() => props.handleOpenArticleEditor()}>記事作成</Button>
      {props.articles.length === 0
      ? <div className={classes.item}>記事がありません</div>

      : props.articles.map((value, key) => {
        return (
          <div
            key={key}
            className={classes.item}
          >
            <div>
              タイトル:{value.title}
              {value.is_published || <span className={classes.itemIsDraft}>下書き</span>}
            </div>
            <div>作成日:{sqlToDate(value.created_at)}</div>
            {value.updated_at ? (
              <div>編集日:{sqlToDate(value.updated_at)}</div>
            ) : null}
            <div>
              {value.article_excerpt}
              {/* 抜粋が100文字の場合"..."追加" */}
              {value.article_excerpt.length === 100 ? "..." : ""}
            </div>
            <button onClick={() => props.handleOnUpDate(value.article_id)}>
              編集
            </button>
            <button onClick={() => props.handleOnDelete(value.article_id)}>
              削除
            </button>
          </div>
        );
      })}
    </div>
  );
}

export const MainMobile = () => {
  const props = useMainMobileProps()

  return <MainMobilePresenter {...props}/>
}
