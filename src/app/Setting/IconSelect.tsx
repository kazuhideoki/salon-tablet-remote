import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {
  ImportContactsTwoTone,
  SignalWifi3BarTwoTone,
  PersonAddTwoTone,
  SettingsApplicationsTwoTone,
  AcUnit,
  AccessAlarm,
  Accessibility,

} from "@material-ui/icons";
import { Popover, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridList: {
      width: 300,
      height: 300,
    },
  }),
);


const tileData = [ImportContactsTwoTone,
  SignalWifi3BarTwoTone,
  PersonAddTwoTone,
  SettingsApplicationsTwoTone, ImportContactsTwoTone,
  SignalWifi3BarTwoTone,
  PersonAddTwoTone,
  SettingsApplicationsTwoTone,
  AcUnit,
  AccessAlarm,
  Accessibility, ImportContactsTwoTone,
  SignalWifi3BarTwoTone,
  PersonAddTwoTone,
  SettingsApplicationsTwoTone,
  AcUnit,
  AccessAlarm,
  Accessibility,]

export const  IconSelect = (props) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  
  const IconItem = (props) => {
    return <props.icon style={{ fontSize: 50 }} />
  }

  return (
    <div className={props.className}>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        アイコン選択
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <GridList cellHeight={50}
        className={classes.gridList}
        cols={5}>
          {tileData.map((tile, index) => (
            <GridListTile key={index} >
              <IconItem icon={tile}/>
            </GridListTile>
          ))}
        </GridList>
      </Popover>
    </div>
  );
}
