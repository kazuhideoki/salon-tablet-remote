import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Popover, Button, TextField, IconButton } from '@material-ui/core';
// import { icons } from "./icons";
import { IconsSetting } from "./icons";
import { EditorContext } from '../../Store/EditorContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridList: {
      width: 300,
      height: 300,
    },
    selectedIconField : {
      width: 70
    }
  })
);

export const IconItem = (props) => {
  const iconName = props.iconName;

  return <props.icon style={{ fontSize: 50 }} />;
};

// export const  IconSelect:React.FC<Props> = ({ selectedIcon, setSelectedIcon}) => {
export const IconSelect = () => {
  const classes = useStyles();
  const { selectedIcon, dispatchSelectedIcon } = React.useContext(
    EditorContext
  );

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
  

  const displayedIcon = (props) => <props.icon />

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
          // タップで閉じるように
          onClick={() => handleClose()}
        >
          {/* // 単純な配列だとうまく行かなかったので各アイコンを配列に入れた */}
          {IconsSetting.icons.map((icon, index) => {
            return (
              <GridListTile
                key={index}
                cols={1}
                //@ts-ignore
                onClick={() =>
                  dispatchSelectedIcon({
                    type: "SET_ICON",
                    payload: icon,
                  })
                }
              >
                {/* // 単純な配列だとうまく行かなかったので各アイコンを配列に入れた */}
                <IconItem icon={icon[0]} />
              </GridListTile>
            );
          })}
        </GridList>
      </Popover>
      {selectedIcon ? <IconItem icon={selectedIcon[0]} /> : null}
    </div>
  );
}
