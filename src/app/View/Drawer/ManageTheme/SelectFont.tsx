import React from 'react'
import { Select, MenuItem } from '@material-ui/core';
import { TUseManageThemeProps } from './ManageTheme';

type Props = TUseManageThemeProps & {className?: string}

export const SelectFont = (props: Props) => {
  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.font1}
        onChange={props.handleChangeThemeFont}
        className={props.className}
      >
        {["Roboto", "futura-pt", '"ヒラギノ角ゴ ProN"'].map((value) => {
          return(<MenuItem value={value}>{value}</MenuItem>)
        })}
      </Select>
    </>
  );
}
