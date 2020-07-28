import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Popover, Button, TextField, IconButton, SvgIconTypeMap } from '@material-ui/core';
import { IconsSetting } from "./icons";
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { MoodBad } from '@material-ui/icons';

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
type TIconItem = {
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}
export const IconItem = (props:TIconItem) => {
  return <props.icon style={{ fontSize: 50 }} />;
};

type Props = {
  selectedIcon: [OverridableComponent<SvgIconTypeMap<{}, "svg">>, string]
  dispatchSelectedIcon: React.Dispatch<{
    type: "SET_ICON";
    payload: [OverridableComponent<SvgIconTypeMap<{}, "svg">>, string];
  }>
}

export const SelectIcon:React.FC<Props> = ({ selectedIcon, dispatchSelectedIcon}) => {
  const classes = useStyles();
  // const { selectedIcon, dispatchSelectedIcon } = React.useContext(
  //   EditorContext
  // );

  // 以下アイコン選択のPopoverのための設定
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  // 以上アイコン選択のPopoverのための設定
  
  return (
    <>
      <Button
        aria-describedby={id}
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
    </>
  );
}
