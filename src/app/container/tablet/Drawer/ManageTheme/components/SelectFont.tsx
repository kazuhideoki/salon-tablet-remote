import React from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { ManageThemePresenterProps } from '../ManageTheme';
import { Font1, Font2 } from '../../../../../stores/theme/lib/fonts';
import { WhichFont } from '../../../../../../pages/api/user_info/theme/font';
import { ThemeFont } from '../../../../../../util/interface/Interface';

type Props = ManageThemePresenterProps & {
  whichFont: WhichFont;
  className?: string;
  value: ThemeFont;
  fonts: (Font1 | Font2)[];
  handleOnChange: (
    event: React.ChangeEvent<{
      value: unknown;
    }>
  ) => Promise<void>;
};

export const SelectFont = (props: Props): JSX.Element => {
  return (
    <>
      <Select
        labelId={`${props.whichFont}_label`}
        id={props.whichFont}
        value={props.value}
        onChange={props.handleOnChange}
        className={props.className}>
        {props.fonts.map((value, index) => {
          return (
            <MenuItem key={index} value={value[0]}>
              <span style={{ fontFamily: value[0] }}>
                {value[1] || value[0]}
              </span>
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
