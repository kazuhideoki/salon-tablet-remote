import React from "react";
import {
  makeStyles,
  createStyles,
  withStyles,
  IconButton,
  Fade,
  Popover,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { SwitchOrderButton } from "./SwitchOrderButton";
import { TUseSwitchOrders } from "../../../ActionCreator/footerItems/useSwitchOrder";
import { UpdateButton, TUpdateButton } from "./UpdateButton";
import { DeleteButton, TDeleteButton } from "./DeleteButton";

type Props = {
  className?: string;
  classNameButtons?: string;
  show?: boolean
  update?: boolean
  updateProps?: TUpdateButton
  delete?: boolean;
  deleteProps?: TDeleteButton
  switch?: boolean
  switchProps?: TUseSwitchOrders
};

const useStyles = makeStyles((theme) =>
  createStyles({
    buttonOnPopover: {
      display: 'none',
    },
  })
);

export const StyledIconButtonEditButton = withStyles({
  root: {
    padding: 8,
    margin: "0 4px",
  },
})(IconButton);

export const EditButtonsBox: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = open ? "edit-buttons-box-popover" : undefined;

  return (
    <>
      <div
        className={`${props.className} ${props.classNameButtons}`}
      >
        <IconButton
          aria-describedby={id}
          onClick={(e) => handleClick(e)}
        >
          <MoreVert />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {props.switch ? <SwitchOrderButton {...props.switchProps} /> : null}
          {props.update ? <UpdateButton {...props.updateProps} /> : null}
          {props.delete ? <DeleteButton {...props.deleteProps} /> : null}
        </Popover>
      </div>
    </>
  );
};