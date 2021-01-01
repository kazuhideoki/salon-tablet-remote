import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { HelpButton } from '../../../../../pureComponents/buttons/HelpButton';
import { Divider, Typography } from '@material-ui/core';
import { SelectTheme } from '../components/SelectTheme';
import { SelectShowArticleType } from '../components/SelectShowArticleType';
import { T_theme_color } from '../../../../../Store/Interface';
import { SelectPrimaryColor } from '../components/SelectPrimaryColor';
import { SelectFont } from '../components/SelectFont';
import { fonts2, fonts1 } from '../../../../../Store/theme/lib/fonts';
import { FiberManualRecord } from '@material-ui/icons';
import { secondaryColor } from '../../../../../../lib/color/secondaryColor';
import { SelectFooterIconSize } from '../components/SelectFooterIconSize';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useAuth } from '../../../../../../lib/auth/AuthProvider';
import { useHandleChange } from '../context/useHandleChange';
import { useHandleChangeThemeColor } from '../context/useHandleChangeThemeColor';
import {
  useHandleChangeThemeFont1,
  useHandleChangeThemeFont2,
  useHandleChangeThemeFontHeading,
} from '../context/useHandleChangeThemeFont';
import { useHandleChangeFooterIconSize } from '../context/useHandleChangeFooterIconSize';
import { useHandleChangeShowArticleType } from '../context/useHandleChangeShowArticleType';
import { useHandleAccordion } from '../context/useHandleAccordion';
import { useStateMangeTheme } from '../context/useStateMangeTheme';

export type THsl = {
  h: number;
  s: number;
  l: number;
};
export type TColor = { hex: T_theme_color; hsl: THsl };

export const useManageTheme = () => {
  const {
    selected_theme,
    theme_color,
    show_article_type,
  } = useStateMangeTheme();

  const { user } = useAuth();

  const { expanded, handleAccordion } = useHandleAccordion();
  const handleChange = useHandleChange();
  const handleChangeThemeColor = useHandleChangeThemeColor();
  const { font1, handleChangeThemeFont1 } = useHandleChangeThemeFont1();
  const { font2, handleChangeThemeFont2 } = useHandleChangeThemeFont2();
  const {
    fontHeading,
    handleChangeThemeFontHeading,
  } = useHandleChangeThemeFontHeading();
  const handleChangeShowArticleType = useHandleChangeShowArticleType();
  const {
    footerIconSize,
    handleChangeFooterIconSize,
  } = useHandleChangeFooterIconSize();

  return {
    selected_theme,
    expanded,
    handleAccordion,
    theme_color,
    handleChangeThemeColor,
    font1,
    font2,
    fontHeading,
    footerIconSize,
    handleChangeThemeFont1,
    handleChangeThemeFont2,
    handleChangeThemeFontHeading,
    handleChangeFooterIconSize,
    show_article_type,
    handleChange,
    handleChangeShowArticleType,
    user,
  };
};

export type TUseManageThemeProps = ReturnType<typeof useManageTheme>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
    },
    header: {
      margin: theme.spacing(2),
    },
    accordionRoot: {
      boxShadow: 'none',
      '&::before': {
        height: 0,
      },
    },
    accordionDetails: {
      display: 'block', // デフォルトのflexを消す
    },
    param: {
      marginLeft: theme.spacing(2),
    },
    selectPrimaryColor: {
      width: 80,
    },
    msg: {
      marginTop: theme.spacing(3),
    },
  })
);

export const ManageThemePresenter: React.FC<TUseManageThemeProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.header}>
        デザイン
      </Typography>
      <SelectTheme {...props} />
      <br />

      <Divider />

      {/* <Accordion expanded={props.expanded === 'panel1'} onChange={props.handleAccordion('panel1')} className={classes.accordionRoot} > */}
      <Accordion
        expanded={props.expanded === true}
        onChange={props.handleAccordion(true)}
        className={classes.accordionRoot}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
          <Typography variant="body1" color="textSecondary">
            テーマ詳細設定
          </Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <div>
            <Typography variant="body1" component="span" color="textSecondary">
              メインカラー
            </Typography>
            <SelectPrimaryColor
              {...props}
              className={`${classes.param} ${classes.selectPrimaryColor}`}
            />

            <Typography variant="body1" component="span" color="textSecondary">
              セカンダリカラー
            </Typography>
            <FiberManualRecord
              style={{
                color: secondaryColor(props.theme_color),
              }}
            />
          </div>
          <div>
            <Typography variant="body1" component="span" color="textSecondary">
              日本語フォント
            </Typography>
            <SelectFont
              {...props}
              whichFont="theme_font2"
              className={classes.param}
              value={props.font2}
              fonts={fonts2}
              handleOnChange={props.handleChangeThemeFont2}
            />
          </div>
          <div>
            <Typography variant="body1" component="span" color="textSecondary">
              日本語フォント 見出し
            </Typography>
            <SelectFont
              {...props}
              whichFont="theme_font_heading"
              className={classes.param}
              value={props.fontHeading}
              fonts={fonts2}
              handleOnChange={props.handleChangeThemeFontHeading}
            />
          </div>
          <div>
            <Typography variant="body1" component="span" color="textSecondary">
              英数字フォント
            </Typography>
            <HelpButton content="英数字を別にフォントを指定する場合は、こちらで設定できます。" />
            <SelectFont
              {...props}
              whichFont="theme_font1"
              className={classes.param}
              value={props.font1}
              fonts={fonts1}
              handleOnChange={props.handleChangeThemeFont1}
            />
          </div>
        </AccordionDetails>
      </Accordion>

      <Divider />
      <div>
        <Typography variant="body1" component="p" color="textSecondary">
          フッターアイコンのサイズ
        </Typography>
        <SelectFooterIconSize {...props} className={classes.param} />
      </div>
      <br />
      <SelectShowArticleType {...props} />
      <Typography
        variant="h5"
        component="p"
        color="textSecondary"
        className={classes.msg}>
        ※随時機能を追加中です。ご希望があればぜひお知らせください。
      </Typography>
    </div>
  );
};

export const ManageTheme = () => {
  const props = useManageTheme();

  return <ManageThemePresenter {...props} />;
};
