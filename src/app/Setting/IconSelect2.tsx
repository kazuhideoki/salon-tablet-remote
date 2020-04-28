import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 100,
      height: 100,
    },
  }),
);

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
import {
  ImportContactsTwoTone,
  SignalWifi3BarTwoTone,
  PersonAddTwoTone,
  SettingsApplicationsTwoTone,
} from "@material-ui/icons";
import { Icon, SvgIcon } from '@material-ui/core';
// const tileData = [<ImportContactsTwoTone/>,
//   <SignalWifi3BarTwoTone/>,
//   <PersonAddTwoTone/>,
//   <SettingsApplicationsTwoTone/>,]
const tileData = [ImportContactsTwoTone,
  SignalWifi3BarTwoTone,
  PersonAddTwoTone,
  SettingsApplicationsTwoTone,]
// const tileIconData = ["ImportContactsTwoTone",
//   "SignalWifi3BarTwoTone",
//   "PersonAddTwoTone",
//   "SettingsApplicationsTwoTone",]

// const tileData = tileIconData.map((value) => {
//   //@ts-ignore
//   return <value style={{ fontSize: 40 }}/>
// })

const IconItem = (props) => {
  return <props.icon style={{ fontSize: 40 }} />
}


export const  IconSelect2 = () => {
  const classes = useStyles();

  return (
    <div 
    // className={classes.root}
    >
      <GridList cellHeight={50} className={classes.gridList} cols={3}>
        {tileData.map((tile, index) => (
          <GridListTile key={index} cols={1}>
            {/* <{tile} style={{ fontSize: 40 }}/> */}
            {/* <Icon style={{ fontSize: 40 }}>{tile}</Icon> */}
            {/* <div style={{ fontSize: 40 }}>{tile}</div> */}
            <IconItem icon={tile}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
