import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { HelpButton } from "../../viewComponents/buttons/HelpButton";
import { ThemeContext } from "../../../Store/ThemeContext";
import { useChangeTheme } from "../../../ActionCreator/user/useChangeTheme";
import { Store } from "../../../Store/Store";
import { Typography } from "@material-ui/core";
import { SelectTheme } from "./SelectTheme";
import { SelectShowArticleType } from "./SelectShowArticleType";
import { useChangeShowArticleType } from "../../../ActionCreator/user/useChangeShowArticleType";
import { T_show_article_type, T_selected_theme, T_theme_color } from "../../../Store/Types";
import { SelectPrimaryColor } from "./SelectPrimaryColor";
import { useChangeThemeColor } from "../../../ActionCreator/user/useChangeThemeColor";
import { SelectFont } from "./SelectFont";
import { TFont1, TFont2 } from "../../../Store/themes/fonts";
import { useChangeThemeFont } from "../../../ActionCreator/user/useChangeThemeFont";
import { FiberManualRecord } from "@material-ui/icons";
import { generateSecondaryColor } from "../../../../lib/color/generateSecondaryColor";
import { selectColorReducer } from "../../../Reducer/selectColorReducer";
import { selectedIconReducer } from "../../../Reducer/selectedIconReducer";
import { secondaryColor } from "../../../../lib/color/secondaryColor";
var colorConvert = require("color-convert");

export type THsl = {
  h: number;
  s: number;
  l: number;
}
export type TColor = {hex: T_theme_color, hsl: THsl}

export const useManageTheme = () => {

  const { appState } = React.useContext(Store)
  const { selected_theme, theme_color, theme_font1, theme_font2, show_article_type } = appState.userInfo

  // const hsl = colorConvert.hex.hsl("#0000FF");
  // console.log("hslは " + hsl);
  // const generated = generateSecondaryColor(hsl);
  // console.log("generatedは " + JSON.stringify(generated));
  // const hex2 = colorConvert.hsl.hex(generated);
  // console.log("hex2は " + hex2);

  const [font1, setFont1] = React.useState(theme_font1)
  const [font2, setFont2] = React.useState(theme_font2)

  const changeTheme = useChangeTheme()
  const changeThemeColor = useChangeThemeColor()
  const changeThemeFont = useChangeThemeFont()
  const changeShowArticleType = useChangeShowArticleType()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeTheme((event.target as HTMLInputElement).value as T_selected_theme);
  };
  const handleChangeThemeColor = async (value: TColor) => {
    // console.log("handleChangeThemeColorのvalueは " + JSON.stringify(value));
    
    const isChanged = await changeThemeColor(value)
    if (isChanged) {
      const params = {
        hex: value.hex,
        hex2: `#${colorConvert.hsl.hex(generateSecondaryColor(value.hsl))}`
      }
      // console.log('【】value.hslは '  + JSON.stringify(value.hsl));
      // console.log('【】generateSecondaryColorは ' + generateSecondaryColor(value.hsl));
      // console.log('【】colorConvert.hsl.hex(generateSecondaryColor(value.hsl))は ' + colorConvert.hsl.hex(generateSecondaryColor(value.hsl)));

    }
  }
  const handleChangeThemeFont = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const isChanged = await changeThemeFont(event.target.value as TFont1[0], false);
    if (isChanged) {
      setFont1(event.target.value as TFont1[0]);
    }
  };
  const handleChangeThemeFont2 = async (event: React.ChangeEvent<{ value: unknown }>) => {
    const isChanged = await changeThemeFont(event.target.value as TFont2[0], true);
    if (isChanged) {
      setFont2(event.target.value as TFont2[0]);
    }
  };

  const handleChangeShowArticleType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
         changeShowArticleType((event.target as HTMLInputElement).value as T_show_article_type);
       };

  return {
    selected_theme,
    theme_color,
    handleChangeThemeColor,
    font1,
    font2,
    handleChangeThemeFont,
    handleChangeThemeFont2,
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
    param: {
      marginLeft: theme.spacing(2),
    },
    selectPrimaryColor: {
      width: 80,
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
             <Typography variant="body1" component="p" color="textSecondary">
               メインカラー
               <SelectPrimaryColor
                 {...props}
                 className={`${classes.param} ${classes.selectPrimaryColor}`}
               />
               セカンダリカラー？
               <FiberManualRecord
                 //  style={{ color: colorConvert.hsl.hex(props.color.hsl) }}
                 style={{
                   color: secondaryColor(props.theme_color),
                 }}
               />
             </Typography>
             <Typography variant="body1" component="p" color="textSecondary">
               日本語フォント
               <SelectFont
                 {...props}
                 isFont2={true}
                 className={classes.param}
               />
             </Typography>
             <Typography variant="body1" component="p" color="textSecondary">
               英数字フォント
               <HelpButton content="英数字を別にフォントを指定する場合は、こちらで設定できます。" />
               <SelectFont {...props} className={classes.param} />
             </Typography>
             <br />
             <SelectShowArticleType {...props} />
           </div>
         );
       };

export const ManageTheme = () => {
  const props = useManageTheme()

  return <ManageThemePresenter {...props}/>
}
