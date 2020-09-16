import React from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@material-ui/core";
import { TUseManageThemeProps } from "./ManageTheme";

export const SelectShowArticleType = (props: TUseManageThemeProps) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">テーマ変更</FormLabel>
      <RadioGroup
        row
        aria-label="select-show-article-type"
        name="select-show-article-type"
        value={props.show_article_type}
        onChange={props.handleChangeShowArticleType}
      >
        <FormControlLabel
          value="scroll"
          control={<Radio />}
          label="スクロール"
        />
        <br/>
        <FormControlLabel
          value="grid6"
          control={<Radio />}
          label="グリッド 6"
        />
      </RadioGroup>
    </FormControl>
  );
}
