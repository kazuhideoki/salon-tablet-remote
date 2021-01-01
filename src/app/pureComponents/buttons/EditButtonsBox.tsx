import React from 'react';
import {
  makeStyles,
  createStyles,
  withStyles,
  IconButton,
  Popover,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { SwitchOrderButton, TSwitchOrderButton } from './SwitchOrderButton';
import { UpdateButton, TUpdateButton } from './UpdateButton';
import { DeleteButton, TDeleteButton } from './DeleteButton';

type Props = {
  className?: string;
  classNameButtons?: string;
  show?: boolean;
  update?: boolean;
  updateProps?: TUpdateButton;
  delete?: boolean;
  deleteProps?: TDeleteButton;
  switch?: boolean;
  switchProps?: TSwitchOrderButton;
};

export const StyledIconButtonEditButton = withStyles({
  root: {
    padding: 8,
    margin: '0 4px',
  },
})(IconButton);

export const EditButtonsBox: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = open ? 'edit-buttons-box-popover' : undefined;

  return (
    <>
      <IconButton className={`${props.className} ${props.classNameButtons}`}>
        <IconButton aria-describedby={id} onClick={(e) => handleClick(e)}>
          <MoreVert />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          {props.switch ? (
            <SwitchOrderButton
              {...props.switchProps}
              handleClose={handleClose}
            />
          ) : null}
          {props.update ? (
            <UpdateButton {...props.updateProps} handleClose={handleClose} />
          ) : null}
          {props.delete ? (
            <DeleteButton {...props.deleteProps} handleClose={handleClose} />
          ) : null}
        </Popover>
      </IconButton>
    </>
  );
};
