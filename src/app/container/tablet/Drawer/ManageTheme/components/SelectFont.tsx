import React from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { TUseManageThemeProps } from '../ManageTheme';
import { TFont1, TFont2 } from '../../../../../store/theme/lib/fonts';
import { TWhichFont } from '../../../../../../pages/api/user_info/theme/font';
import { T_theme_font } from '../../../../../../util/interface/Interface';

type Props = TUseManageThemeProps & {
  whichFont: TWhichFont;
  className?: string;
  value: T_theme_font;
  fonts: TFont1[] | TFont2[];
  handleOnChange: (
    event: React.ChangeEvent<{
      value: unknown;
    }>
  ) => Promise<void>;
};

export const SelectFont = (props: Props) => {
  return (
    <>
      <Select
        labelId={`${props.whichFont}_label`}
        id={props.whichFont}
        value={props.value}
        onChange={props.handleOnChange}
        className={props.className}>
        {
          //@ts-ignore
          props.fonts.map((value, index) => {
            return (
              <MenuItem key={index} value={value[0]}>
                <span style={{ fontFamily: value[0] }}>
                  {value[1] || value[0]}
                </span>
              </MenuItem>
            );
          })
        }
      </Select>
    </>
  );
};
