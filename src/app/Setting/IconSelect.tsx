import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStylesFactory } from '../Store/useStylesFactory';
import {
  ImportContactsTwoTone,
  SignalWifi3BarTwoTone,
  PersonAddTwoTone,
  SettingsApplicationsTwoTone,
} from "@material-ui/icons";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 240,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    menuItem: {
      display: 'flex',
      flexDirection: 'column',
    }
  }),
);

export const IconSelect = () => {
  const classes = useStylesFactory(styles)
  const [selectedIcon, setSelectedIcon] = React.useState('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedIcon(event.target.value as string);
  };
  return (
    <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Icon</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedIcon}
            onChange={handleChange}
          >
        //@ts-ignore
          <MenuItem className={classes.menuItem} value={'ImportContactsTwoTone'}><ImportContactsTwoTone/></MenuItem>
          //@ts-ignore
          <MenuItem value={SignalWifi3BarTwoTone}><SignalWifi3BarTwoTone/></MenuItem>
          //@ts-ignore
          <MenuItem value={SettingsApplicationsTwoTone}><SettingsApplicationsTwoTone/></MenuItem>
          </Select>
        </FormControl>
    </div>
      
  )
}
