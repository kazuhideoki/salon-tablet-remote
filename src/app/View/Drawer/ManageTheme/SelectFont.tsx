import React from 'react'
import { Select, MenuItem } from '@material-ui/core';
import { TUseManageThemeProps } from './ManageTheme';
import { fonts } from '../../../Store/themes/fonts';

type Props = TUseManageThemeProps & {isFont2?: boolean, className?: string}

export const SelectFont = (props: Props) => {
  const value = props.isFont2 ? props.font2 : props.font1;
  const handleOnChange = props.isFont2
    ? props.handleChangeThemeFont2
    : props.handleChangeThemeFont;
  const id = props.isFont2 ? "select_font_2" : "select_font_1";

  return (
    <>
      <Select
        labelId={`${id}_label`}
        id={id}
        value={value}
        onChange={handleOnChange}
        className={props.className}
      >
        {fonts.map((value) => {
          return (
            <MenuItem value={value}>
              <span style={{ fontFamily: value }}>
                {value}
              </span>
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
}
