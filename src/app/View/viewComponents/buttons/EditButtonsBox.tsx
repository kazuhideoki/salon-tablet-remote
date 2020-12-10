import React from "react";
import {
  makeStyles,
  createStyles,
  withStyles,
  IconButton,
  Fade,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

type props = {
  className?: string;
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

export const EditButtonsBox: React.FC<props> = (props) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);

  const onClickHandle = () => {
    setChecked(!checked);
  };

  const Children = props.children

  return (
    <>
      <div className={`${classes.root} ${props.className}`}>
        {checked ? null : (
          <IconButton onClick={() => onClickHandle()}>
            <MoreVert />
          </IconButton>
        )}
        {checked ? (
          <Fade in={checked}>
            <div onClick={() => onClickHandle()}>
              {props.children}
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
