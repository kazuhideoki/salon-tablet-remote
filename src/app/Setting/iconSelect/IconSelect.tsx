import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Popover, Button, TextField, IconButton } from '@material-ui/core';
import { icons } from "./icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridList: {
      width: 300,
      height: 300,
    },
  }),
);

export const  IconSelect = ({ selectedIcon, setSelectedIcon,}) => {
  const classes = useStyles();

  // 以下Popoverのための設定
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  // 以上Popoverのための設定
  
  const IconItem = (props) => {
      
    const iconName = props.icon
    return (
      // これつけると薄くなる？？
      <IconButton
        // onClickでアイコン名をsetする
        onClick={() => props.setSelectedIcon(iconName)}
        aria-label={"icon_selection"}
      >
        <props.icon style={{ fontSize: 50 }} />
      </IconButton>
    );
  }

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        アイコン選択
      </Button>
      {/* ButtonをタップするとPopoverが表示される */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        {/* アイコンをグリッド表示する */}
        <GridList
          cellHeight={50}
          className={classes.gridList}
          cols={5}
          onClick={() => handleClose()}
        >
          {icons.map((icon, index) => {
            return (
              <GridListTile key={index}>
                <IconItem
                  icon={icon}
                  iconName={icon.name}
                  setSelectedIcon={setSelectedIcon}
                />
              </GridListTile>
            );
          })}
        </GridList>
      </Popover>
      <TextField
        value={selectedIcon}
        InputProps={{
          readOnly: true,
        }}
        id="outlined-basic"
        label="アイコン"
        variant="outlined"
      />
    </div>
  );
}
