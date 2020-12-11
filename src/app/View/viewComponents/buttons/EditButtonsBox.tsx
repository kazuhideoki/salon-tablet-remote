import React from "react";
import {
  makeStyles,
  createStyles,
  withStyles,
  IconButton,
  Fade,
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
    root: {
      display: "flex",
      flexWrap: "nowrap",
      // gap: `${theme.spacing(1)}px`,
      borderRadius: theme.spacing(3),
      boxShadow: theme.shadows[3],
      backgroundColor: "rgba(255,255,255,0.8)",
      border: "2px solid grey",
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
  const [checked, setChecked] = React.useState(props.show ? true : false);

  const openBox = () => {
    if(props.show !== true) setChecked(true);
  };
  const closeBox = () => {
    if (props.show !== true) setChecked(false);
  }

  return (
    <>
      <div className={`${classes.root} ${props.className} ${props.classNameButtons}`}>
        {checked ? null : (
          <IconButton onClick={() => openBox()}>
            <MoreVert />
          </IconButton>
        )}
        {checked ? (
          <Fade in={checked}>
            <div>
              {props.switch ? (
                <SwitchOrderButton {...props.switchProps} closeBox={closeBox} />
              ) : null}
              {props.update ? (
                <UpdateButton {...props.updateProps} closeBox={closeBox} />
              ) : null}
              {props.delete ? (
                <DeleteButton {...props.deleteProps} closeBox={closeBox} />
              ) : null}
            </div>
          </Fade>
        ) : null}
      </div>
    </>
  );
};

// EditbuttonsBoxに props渡すだけにする
// → propsはどのbuttonにするか？隠すか最初から表示するか？
// → それぞれのonClickを渡す
