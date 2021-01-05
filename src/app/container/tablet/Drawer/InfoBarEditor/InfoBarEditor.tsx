import React from 'react';
import dynamic from 'next/dynamic';
const SmallQuillEditor = dynamic(
  () => import('./components/SmallQuillEditor'),
  {
    ssr: false,
  }
);
import {
  Button,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Grid,
} from '@material-ui/core';
import { CharCounter } from '../../../../components/CharCounter';
import { SwitchOnTapInfoBar } from './components/SwitchOnTapInfoBar';
import { SelectArticleInfoBar } from './components/SelectArticleInfoBar';
import { PublishTwoTone } from '@material-ui/icons';
import { useStateInfoBarEditor } from './context/useStateInfoBarEditor';
import { useUpdateInfoBar } from './context/useUpdateInfoBar';

const useInfoBarEditorProps = () => {
  const {
    allArticles,
    infoBarType,
    setInfoBarType,
    editorText,
    setEditorText,
    articleInfoBar,
    setArticleInfoBar,
    charCount,
    setCharCount,
  } = useStateInfoBarEditor();

  const updateInfoBar = useUpdateInfoBar({
    infoBarType,
    editorText,
    articleInfoBar,
    charCount,
  });

  return {
    infoBarType,
    setInfoBarType,
    editorText,
    setEditorText,
    charCount,
    setCharCount,
    articleInfoBar,
    setArticleInfoBar,
    allArticles,
    updateInfoBar,
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2),
    },
    switchOnTapInfoBar: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },
    charCounter: {
      textAlign: 'right',
    },
    selectArticleInfoBar: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },
    bottomDiv: {
      position: 'sticky',
      bottom: 0,
      marginRight: theme.spacing(2),
      zIndex: 100,
    },
    submitButton: {
      marginLeft: 'auto',
      marginRight: theme.spacing(1),
    },
  })
);

export type TUseInfoBarEditorProps = ReturnType<typeof useInfoBarEditorProps>;

export const InfoBarEditorPresenter: React.FC<TUseInfoBarEditorProps> = (
  props
) => {
  const classes = useStyles();

  const mainField: JSX.Element = (() => {
    switch (props.infoBarType) {
      case 'scrolling_sentence':
        return (
          <>
            <SmallQuillEditor
              editorText={props.editorText}
              setEditorText={props.setEditorText}
              setCharCount={props.setCharCount}
            />
            <div className={classes.charCounter}>
              <CharCounter
                charCount={props.charCount}
                limitCount={500}
                isShowCount
              />
            </div>
          </>
        );
      case 'article':
        return (
          <>
            <SelectArticleInfoBar
              articleInfoBar={props.articleInfoBar}
              setArticleInfoBar={props.setArticleInfoBar}
              AllArticles={props.allArticles}
              className={classes.selectArticleInfoBar}
            />
          </>
        );

      default:
        return <></>;
    }
  })();

  return (
    <div>
      <Typography variant="h4" component="h2" className={classes.header}>
        インフォの設定
      </Typography>

      <SwitchOnTapInfoBar
        infoBarType={props.infoBarType}
        setInfoBarType={props.setInfoBarType}
        className={classes.switchOnTapInfoBar}
      />

      {mainField}

      <div className={classes.bottomDiv}>
        <Grid container>
          <Grid item className={classes.submitButton}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.updateInfoBar()}
              startIcon={<PublishTwoTone />}
              disabled={props.charCount < 501 ? false : true}>
              更新
            </Button>
          </Grid>
          <Grid item></Grid>
        </Grid>
      </div>
    </div>
  );
};

const InfoBarEditor = () => {
  const props = useInfoBarEditorProps();

  return <InfoBarEditorPresenter {...props} />;
};
export default InfoBarEditor;
