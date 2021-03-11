import React from 'react';
import { SelectIcon } from './components/iconSelect/SelectIcon';
import dynamic from 'next/dynamic';
const QuillEditor = dynamic(() => import('../QuillEditor/QuillEditor'), {
  ssr: false,
});
import { SwitchOnTapModal } from './components/SwitchOnTapModal';
import {
  TextField,
  Button,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Switch,
  useTheme,
} from '@material-ui/core';
import { SelectAppLink } from './components/SelectAppLink';
import { CharCounter } from '../../../../components/CharCounter';
import { SelectModalSize } from './components/SelectModalSize';
import { HelpButton } from '../../../../components/HelpButton';
import { PublishTwoTone, SaveTwoTone } from '@material-ui/icons';
import { SwitchDataTypeBox } from '../QuillEditor/components/SwitchDataTypeBox';
import { useIsMobile } from '../../../../../util/useIsMobile';
import { useHandleSubmit } from './context/useHandleSubmit';
import { useHandleChange } from './context/useHandleChange';
import { useHandleOnSidebar } from './context/useHandleOnSidebar';
import { useStateFooterItemEditor } from './context/useStateFooterItemEditor';
import { FooterItemEdittingParams } from '../../../../hooks/footerItems/useCreateFooterItem';
import {
  DataTypeArticle,
  DataTypeFooterItem,
} from '../../../../../util/interface/Interface';
import { DataTypeAndSet } from '../QuillEditor/components/SwitchDataTypeBox';
import {
  FooterItemEditorPresenterProps,
  useFooterItemEditorProps,
} from './useFooterItemEditorProps';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2),
    },
    topDiv: {
      display: 'flex',
      marginBottom: theme.spacing(2),
    },
    title: {
      width: '50%',
      margin: `0 ${theme.spacing(2)}px`,
      maxWidth: '100%',
    },
    selectIcon: {
      margin: `0 ${theme.spacing(2)}px`,
    },

    switchOnTapModal: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },
    switchSidebar: {
      margin: theme.spacing(0, 2),
    },
    selectModalSize: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },

    linkTextField: {
      minWidth: '80%',
      maxWidth: '100%',
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },
    appLink: {
      margin: `0 ${theme.spacing(2)}px ${theme.spacing(1)}px`,
    },
    googleSearch: {
      margin: theme.spacing(4),
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

export const FooterItemEditorPresenter: React.FC<FooterItemEditorPresenterProps> = (
  props
) => {
  const classes = useStyles();

  const mainField: JSX.Element = (() => {
    switch (props.onTapRadio) {
      case 'modal':
        return (
          <div>
            <SelectModalSize {...props} className={classes.selectModalSize} />

            <QuillEditor
              editorText={props.editorText}
              setEditorText={props.setEditorText}
              setEditorTextExcerpt={props.setEditorTextExcerpt}
              setCharCount={props.setCharCountFooterItemContent}
            />
            <div className={classes.charCounter}>
              <CharCounter
                charCount={props.charCountFooterItemContent}
                limitCount={1000}
                align="right"
                isShowCount
              />
            </div>
          </div>
        );
      case 'link':
        return (
          <div>
            <TextField
              id="linkUrl"
              label="リンクURL"
              value={props.linkUrl}
              onChange={(e) => props.setLinkUrl(e.target.value)}
              className={classes.linkTextField}
            />
          </div>
        );
      case 'appLink':
        return (
          <div>
            <SelectAppLink
              appLinkUrl={props.appLinkUrl}
              setAppLinkUrl={props.setAppLinkUrl}
              className={classes.appLink}
            />
          </div>
        );
      case 'google':
        return (
          <div className={classes.googleSearch}>
            <Typography variant="h4" color="textSecondary" align="center">
              Google検索機能（実験機能）
            </Typography>
          </div>
        );

      default:
        return <></>;
    }
  })();

  return (
    <>
      <Typography variant="h4" component="h2" className={classes.header}>
        {props.isEditting ? 'アイテム編集' : 'アイテム作成'}
      </Typography>
      {props.is_admin ? (
        <SwitchDataTypeBox dataTypeAndSet={props.dataTypeAndSet} forFooter />
      ) : null}

      <div className={classes.topDiv}>
        <TextField
          id="icon-name-text-field"
          label="アイテム名"
          multiline
          value={props.titleText}
          onChange={(e) => props.setTitleText(e.target.value)}
          className={classes.title}
        />
        <HelpButton content="名前がきれいに表示されないときは、改行するか短くしてみて下さい。" />
        <CharCounter charCount={props.titleText.length} limitCount={100} />
        <br />

        <SelectIcon className={classes.selectIcon} {...props} />
      </div>

      <SwitchOnTapModal className={classes.switchOnTapModal} {...props} />
      <div
        style={{ display: 'inline-block' }}
        className={classes.switchSidebar}>
        \{' '}
        <Typography variant="body1" component="p" color="textSecondary">
          サイドバーに表示
          <HelpButton
            content="タブレットビューでのみ適応。モバイルビューでは全てサイドバーに表示されます。"
            size="small"
          />
        </Typography>
        <Switch
          checked={props.onSidebar}
          onChange={props.handleOnSidebar}
          name="onSidebar"
          color="primary"
        />
      </div>

      {mainField}

      <div className={classes.bottomDiv}>
        <Grid container>
          <Grid item className={classes.submitButton}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.handleSubmit(true)}
              startIcon={<PublishTwoTone />}
              disabled={
                props.titleText.length < 101 &&
                props.charCountFooterItemContent < 1001
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
                props.charCountFooterItemContent < 1001
                  ? false
                  : true
              }>
              下書き保存
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const FooterItemEditor = () => {
  const props = useFooterItemEditorProps();

  return <FooterItemEditorPresenter {...props} />;
};

export default FooterItemEditor;
