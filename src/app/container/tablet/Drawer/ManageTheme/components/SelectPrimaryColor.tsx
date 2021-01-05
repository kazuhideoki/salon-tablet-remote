import React from 'react';
import { TextField, Popover } from '@material-ui/core';
import { SwatchesPicker } from 'react-color';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { FiberManualRecord } from '@material-ui/icons';
import { TUseManageThemeProps } from '../ManageTheme';

type Props = TUseManageThemeProps & { className?: string };

export const SelectPrimaryColor = (props: Props) => {
  return (
    <PopupState variant="popover" popupId="theme-color-popup-popover">
      {(popupState) => (
        <>
          <TextField
            value={props.theme_color}
            inputProps={{ style: { color: props.theme_color } }}
            {...bindTrigger(popupState)}
            className={props.className}
          />
          <FiberManualRecord style={{ color: props.theme_color }} />
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}>
            <SwatchesPicker
              color={props.theme_color}
              onChangeComplete={props.handleChangeThemeColor}
            />
          </Popover>
        </>
      )}
    </PopupState>
  );
};
