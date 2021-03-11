import React from 'react';
import { Select, MenuItem } from '@material-ui/core';
import { ManageThemePresenterProps } from '../useManageTheme';
import { FooterIconSize } from '../../../../../../util/interface/Interface';

type Props = ManageThemePresenterProps & { className?: string };

export const SelectFooterIconSize = (props: Props) => {
  const id = 'select_footer_icon_size';

  const sizes: [string, FooterIconSize][] = [
    ['中', 'medium'],
    ['小', 'small'],
  ];

  return (
    <>
      <Select
        labelId={`${id}_label`}
        id={id}
        value={props.footerIconSize}
        onChange={props.handleChangeFooterIconSize}
        className={props.className}>
        {sizes.map((value, index) => {
          return (
            <MenuItem key={index} value={value[1]}>
              {value[0]}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
