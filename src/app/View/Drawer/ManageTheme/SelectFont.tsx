import React from 'react'
import { Select, MenuItem } from '@material-ui/core';
import { TUseManageThemeProps } from './ManageTheme';
import { fonts1, fonts2, FontNameToFontFamily } from '../../../Store/themes/fonts';

type Props = TUseManageThemeProps & {isFont2?: boolean, className?: string}

export const SelectFont = (props: Props) => {
  const value = props.isFont2 ? props.font2 : props.font1;
  const handleOnChange = props.isFont2
    ? props.handleChangeThemeFont2
    : props.handleChangeThemeFont;
  const id = props.isFont2 ? "select_font_2" : "select_font_1";

  const fonts = props.isFont2 ? fonts2 : fonts1

  return (
    <>
      <Select
        labelId={`${id}_label`}
        id={id}
        value={value}
        onChange={handleOnChange}
        className={props.className}
      >
        
        {//@ts-ignore
        fonts.map((value) => {
          return (
            <MenuItem value={value[0]}>
              <span style={{ fontFamily: FontNameToFontFamily(value[0]) }}>
                {value[0]}
              </span>
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}
