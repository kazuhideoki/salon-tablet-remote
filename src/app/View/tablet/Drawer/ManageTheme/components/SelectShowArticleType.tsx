import React from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@material-ui/core';
import { TUseManageThemeProps } from '../view/ManageTheme';
import { HelpButton } from '../../../../../pureComponents/HelpButton';

export const SelectShowArticleType = (props: TUseManageThemeProps) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        メイン画面記事表示方法
        <HelpButton content="タブレットビューでのみ適応されます" size="small" />
      </FormLabel>

      <RadioGroup
        row
        aria-label="select-show-article-type"
        name="select-show-article-type"
        value={props.show_article_type}
        onChange={props.handleChangeShowArticleType}>
        <FormControlLabel
          value="scroll"
          control={<Radio />}
          label="スクロール"
        />
        <FormControlLabel
          value="grid6"
          control={<Radio />}
          label="グリッド 6"
        />
      </RadioGroup>
    </FormControl>
  );
};
