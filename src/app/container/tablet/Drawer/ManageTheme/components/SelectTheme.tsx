import React from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@material-ui/core';
import { ManageThemePresenterProps } from '../useManageTheme';

export const SelectTheme = (props: ManageThemePresenterProps) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">テーマ</FormLabel>
      <RadioGroup
        row
        aria-label="setting-theme"
        name="setting-theme"
        value={props.selected_theme}
        onChange={props.handleChange}>
        {props.user ? (
          <FormControlLabel
            value="default"
            control={<Radio />}
            label="デフォルト"
          />
        ) : null}

        <FormControlLabel value="white" control={<Radio />} label="白" />
        <FormControlLabel
          value="natural"
          control={<Radio />}
          label="ナチュラル"
        />
      </RadioGroup>
    </FormControl>
  );
};
