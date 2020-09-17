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
import { T_show_article_type } from "../../../Store/Types";

export const useManageTheme = () => {

  // const { selectedTheme, setSelectedTheme } = React.useContext(ThemeContext);
  const { appState } = React.useContext(Store)
  const { selected_theme, show_article_type } = appState.userInfo
  const changeTheme = useChangeTheme()
  const changeShowArticleType = useChangeShowArticleType()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeTheme((event.target as HTMLInputElement).value);
  };
  const handleChangeShowArticleType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
         changeShowArticleType((event.target as HTMLInputElement).value as T_show_article_type);
       };

  return {
    selected_theme,
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
             <br/>
             <SelectShowArticleType {...props} />
           </div>
         );
       };

export const ManageTheme = () => {
  const props = useManageTheme()

  return <ManageThemePresenter {...props}/>
}
