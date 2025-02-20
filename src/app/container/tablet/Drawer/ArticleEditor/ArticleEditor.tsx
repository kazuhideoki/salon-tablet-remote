import React from 'react';
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('../QuillEditor/QuillEditor'), {
  ssr: false,
});
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Grid,
} from '@material-ui/core';
import { SelectTagsPopover } from './components/SelectTagsPopover';
import { CharCounter } from '../../../../components/CharCounter';
import { SaveTwoTone, PublishTwoTone } from '@material-ui/icons';
import { SwitchDataTypeBox } from '../QuillEditor/components/SwitchDataTypeBox';
import pure from 'recompose/pure';
import { useArticleEditorProps } from './useArticleEditorProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    header: {
      margin: theme.spacing(2),
    },
    topDiv: {
      display: 'flex',
      marginBottom: theme.spacing(2),
    },
    title: {
      width: '50%',
      marginLeft: theme.spacing(2),
      maxWidth: '100%',
    },
    selectTagsPopover: {
      margin: `0 ${theme.spacing(2)}px`,
    },

    bottomDiv: {
      position: 'sticky',
      bottom: 0,
      marginRight: theme.spacing(2),
      zIndex: 100,
    },
    charCounter: {
      textAlign: 'right',
    },
    submitButton: {
      marginLeft: 'auto',
      marginRight: theme.spacing(1),
    },
  })
);

export type ArticleEditorPresenterProps = ReturnType<
  typeof useArticleEditorProps
>;

export const ArticleEditorPresenterOriginal: React.FC<ArticleEditorPresenterProps> = (
  props
) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.header}>
        {props.isEditting ? '記事編集' : '記事作成'}
      </Typography>
      {props.is_admin ? (
        <SwitchDataTypeBox dataTypeAndSet={props.dataTypeAndSet} />
      ) : null}
      <div className={classes.topDiv}>
        <TextField
          id="article-title-text-field"
          label="タイトル"
          value={props.titleText}
          onChange={(e) => props.setTitleText(e.target.value)}
          className={classes.title}
        />
        <CharCounter charCount={props.titleText.length} limitCount={100} />
        <SelectTagsPopover className={classes.selectTagsPopover} {...props} />
      </div>

      <QuillEditor
        editorText={props.editorText}
        setEditorText={props.setEditorText}
        setEditorTextExcerpt={props.setEditorTextExcerpt}
        setEditorImg={props.setEditorImg}
        setCharCount={props.setCharCountArticleContent}
      />

      <div className={classes.bottomDiv}>
        <div className={classes.charCounter}>
          <CharCounter
            charCount={props.charCountArticleContent}
            limitCount={1000}
            align="right"
            isShowCount
          />
        </div>
        <Grid container>
          <Grid item className={classes.submitButton}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.handleSubmit(true)}
              startIcon={<PublishTwoTone />}
              disabled={
                props.titleText.length < 101 &&
                props.charCountArticleContent < 1001
                  ? false
                  : true
              }>
              {props.isEditting ? '更新' : '投稿'}
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => props.handleSubmit(false)}
              startIcon={<SaveTwoTone />}
              disabled={
                props.titleText.length < 101 &&
                props.charCountArticleContent < 1001
                  ? false
                  : true
              }>
              下書き保存
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export const ArticleEditorPresenter = pure(ArticleEditorPresenterOriginal);

const ArticleEditor: React.FC = () => {
  const props = useArticleEditorProps();

  return <ArticleEditorPresenter {...props} />;
};
export default ArticleEditor;
