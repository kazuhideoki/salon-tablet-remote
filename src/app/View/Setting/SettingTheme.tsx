import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { HelpButton } from "../buttons/HelpButton";
import { ThemeContext } from "../../Store/ThemeContext";

export const useSettingTheme = () => {

  const { selectedTheme, setSelectedTheme } = React.useContext(ThemeContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTheme((event.target as HTMLInputElement).value);
  };

  return {
    selectedTheme,
    handleChange,
  };

}

type props = ReturnType<typeof useSettingTheme>

export const SettingThemePresenter:React.FC<props> = (props) => {

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">テーマ変更</FormLabel>
        <RadioGroup
          row
          aria-label="setting-theme"
          name="setting-theme"
          value={props.selectedTheme}
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
