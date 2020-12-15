import React from 'react'
import { Select, MenuItem } from '@material-ui/core';
import { TUseManageThemeProps } from './ManageTheme';
import { fonts1, fonts2, Deprecated_FontNameToFontFamily, TFont1, TFont2 } from '../../../Store/themes/fonts';
import { TWhichFont } from '../../../../pages/api/user_info/theme/font';
import { T_theme_font } from '../../../Store/Types';

type Props = TUseManageThemeProps & {whichFont: TWhichFont, className?: string, value: T_theme_font, fonts: TFont1[] | TFont2[], handleOnChange: (event: React.ChangeEvent<{
    value: unknown;
}>) => Promise<void>
}

export const SelectFont = (props: Props) => {

  // const value = props.isFont2 ? props.font2 : props.font1;
  // const handleOnChange = props.isFont2
  //   ? props.handleChangeThemeFont2
  //   : props.handleChangeThemeFont;
  // const id = props.isFont2 ? "select_font_2" : "select_font_1";

  // const fonts = props.isFont2 ? fonts2 : fonts1

  return (
    <>
      <Select
        labelId={`${props.whichFont}_label`}
        id={props.whichFont}
        value={props.value}
        onChange={props.handleOnChange}
        className={props.className}
      >
        
        {//@ts-ignore
        props.fonts.map((value, index) => {
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
}
