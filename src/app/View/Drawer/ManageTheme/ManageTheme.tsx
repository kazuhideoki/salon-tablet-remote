import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { HelpButton } from "../../viewComponents/buttons/HelpButton";
import { TThemeParams } from "../../../Store/ThemeContext";
import { useChangeTheme } from "../../../ActionCreator/user/useChangeTheme";
import { Store } from "../../../Store/Store";
import { Divider, Typography } from "@material-ui/core";
import { SelectTheme } from "./SelectTheme";
import { SelectShowArticleType } from "./SelectShowArticleType";
import { useChangeShowArticleType } from "../../../ActionCreator/user/useChangeShowArticleType";
import { T_show_article_type, T_selected_theme, T_theme_color, T_footer_icon_size } from "../../../Store/Types";
import { SelectPrimaryColor } from "./SelectPrimaryColor";
import { useChangeThemeColor } from "../../../ActionCreator/user/useChangeThemeColor";
import { SelectFont } from "./SelectFont";
import { TFont1, TFont2, fonts2, fonts1 } from "../../../Store/themes/fonts";
import { useChangeThemeFont } from "../../../ActionCreator/user/useChangeThemeFont";
import { FiberManualRecord } from "@material-ui/icons";
import { generateSecondaryColor } from "../../../../lib/color/generateSecondaryColor";
import { secondaryColor } from "../../../../lib/color/secondaryColor";
import { SelectFooterIconSize } from "./SelectFooterIconSize";
import { useChangeFooterIconSize } from "../../../ActionCreator/user/useChangeFooterIconSize";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {isThemeParamsChanged} from '../../../Store/themes/paramsFromTheme'
var colorConvert = require("color-convert");

export type THsl = {
  h: number;
  s: number;
  l: number;
}
export type TColor = {hex: T_theme_color, hsl: THsl}

export const useManageTheme = () => {

  const { appState } = React.useContext(Store)
  const { selected_theme, theme_color, theme_font1, theme_font2, theme_font_heading, footer_icon_size, show_article_type } = appState.userInfo
  const [font1, setFont1] = React.useState(theme_font1)
  const [font2, setFont2] = React.useState(theme_font2)
  const [fontHeading, setFontHeading] = React.useState(theme_font_heading);
  const [footerIconSize, setFooterIconSize] = React.useState(
    footer_icon_size
  );
  const changeTheme = useChangeTheme()
  const changeThemeColor = useChangeThemeColor()
  const changeThemeFont = useChangeThemeFont()
  const changeFooterIconSize = useChangeFooterIconSize()
  const changeShowArticleType = useChangeShowArticleType()

  const themeParams: TThemeParams = {
    selected_theme: selected_theme,
    theme_color: theme_color,
    theme_font1: theme_font1,
    theme_font2: theme_font2,
    theme_font_heading: theme_font_heading,
}

  const [expanded, setExpanded] = React.useState(isThemeParamsChanged(themeParams));

  const handleAccordion = (panel: boolean) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? true : false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeTheme((event.target as HTMLInputElement).value as T_selected_theme);
  };
  const handleChangeThemeColor = async (value: TColor) => {
    
    const isChanged = await changeThemeColor(value)
    if (isChanged) {
      const params = {
        hex: value.hex,
        hex2: `#${colorConvert.hsl.hex(generateSecondaryColor(value.hsl))}`
      }
    }
  }
  const handleChangeThemeFont1 = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const isChanged = await changeThemeFont(event.target.value as TFont1[0], 'theme_font1');
    if (isChanged) {
      setFont1(event.target.value as TFont1[0]);
    }
  };
  const handleChangeThemeFont2 = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const isChanged = await changeThemeFont(event.target.value as TFont2[0], 'theme_font2');
    if (isChanged) {
      setFont2(event.target.value as TFont2[0]);
    }
  };
  const handleChangeThemeFontHeading = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const isChanged = await changeThemeFont(event.target.value as TFont2[0], 'theme_font_heading');
    if (isChanged) {
      setFontHeading(event.target.value as TFont2[0]);
    }
  };

  const handleChangeShowArticleType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
         changeShowArticleType((event.target as HTMLInputElement).value as T_show_article_type);
       };

  const handleChangeFooterIconSize = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const isChanged = await changeFooterIconSize(
      event.target.value as T_footer_icon_size
    );
    if (isChanged) {
      setFooterIconSize(event.target.value as T_footer_icon_size);
    }
  };

  return {
    selected_theme,
    expanded,
    // setExpanded,
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
  };

}

export type TUseManageThemeProps = ReturnType<typeof useManageTheme>

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
    }
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

             <Divider/>

             {/* <Accordion expanded={props.expanded === 'panel1'} onChange={props.handleAccordion('panel1')} className={classes.accordionRoot} > */}
             <Accordion expanded={props.expanded === true} onChange={props.handleAccordion(true)} className={classes.accordionRoot} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant="body1" color="textSecondary">テーマ詳細設定</Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetails}>
                
              <Typography variant="body1" component="p" color="textSecondary">
                メインカラー
                <SelectPrimaryColor
                  {...props}
                  className={`${classes.param} ${classes.selectPrimaryColor}`}
                />
                セカンダリカラー
                <FiberManualRecord
                  style={{
                    color: secondaryColor(props.theme_color),
                  }}
                />
              </Typography>
              <Typography variant="body1" component="p" color="textSecondary">
                日本語フォント
                <SelectFont
                  {...props}
                  whichFont="theme_font2"
                  className={classes.param}
                  value={props.font2}
                  fonts={fonts2}
                  handleOnChange={props.handleChangeThemeFont2}
                />
              </Typography>
              <Typography variant="body1" component="p" color="textSecondary">
                日本語フォント 見出し
                <SelectFont
                  {...props}
                  whichFont="theme_font_heading"
                  className={classes.param}
                  value={props.fontHeading}
                  fonts={fonts2}
                  handleOnChange={props.handleChangeThemeFontHeading}
                />
              </Typography>
              <Typography variant="body1" component="p" color="textSecondary">
                英数字フォント
                <HelpButton content="英数字を別にフォントを指定する場合は、こちらで設定できます。" />
                <SelectFont
                  {...props}
                  whichFont="theme_font1"
                  className={classes.param}
                  value={props.font1}
                  fonts={fonts1}
                  handleOnChange={props.handleChangeThemeFont1}
                />
              </Typography>

             </AccordionDetails>
            </Accordion>

            <Divider/>

             <Typography variant="body1" component="p" color="textSecondary">
               フッターアイコンのサイズ
               <SelectFooterIconSize {...props} className={classes.param} />
             </Typography>
             <br />
             <SelectShowArticleType {...props} />
             <Typography
               variant="h5"
               component="p"
               color="textSecondary"
               className={classes.msg}
             >
               ※随時機能を追加中です。ご希望があればぜひお知らせください。
             </Typography>
           </div>
         );
       };

export const ManageTheme = () => {
  const props = useManageTheme()

  return <ManageThemePresenter {...props}/>
}
