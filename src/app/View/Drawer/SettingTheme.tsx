import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { HelpButton } from "../viewComponents/buttons/HelpButton";
import { ThemeContext } from "../../Store/ThemeContext";
import { useChangeTheme } from "../../ActionCreator/user/useChangeTheme";
import { Store } from "../../Store/Store";
import { Typography } from "@material-ui/core";

export const useSettingTheme = () => {

  // const { selectedTheme, setSelectedTheme } = React.useContext(ThemeContext);
  const { appState } = React.useContext(Store)
  const { selected_theme } = appState.userInfo
  const changeTheme = useChangeTheme()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeTheme((event.target as HTMLInputElement).value);
  };

  return {
    selected_theme,
    handleChange,
  };

}

type props = ReturnType<typeof useSettingTheme>

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

export const SettingThemePresenter:React.FC<props> = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.header}>
        テーマ選択
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">テーマ変更</FormLabel>
        <RadioGroup
          row
          aria-label="setting-theme"
          name="setting-theme"
          value={props.selected_theme}
          onChange={props.handleChange}
        >
          <FormControlLabel
            value="nonTheme"
            control={<Radio />}
            label="テーマなし"
          />
          <FormControlLabel
            value="minimal"
            control={<Radio />}
            label="ミニマル"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export const SettingTheme = () => {
  const props = useSettingTheme()

  return <SettingThemePresenter {...props}/>
}
