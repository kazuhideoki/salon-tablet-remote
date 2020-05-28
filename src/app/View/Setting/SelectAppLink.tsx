import React from 'react'
import {
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { EditorContext } from '../../Store/EditorContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

export const SelectAppLink = ({appLinkUrl, setAppLinkUrl}) => {
  const classes = useStyles()
  // const { appLinkUrl, setAppLinkUrl} = React.useContext(EditorContext)
  // const [value, setVaule] = React.useState('')

  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setVaule(event.target.value as number);
  // };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={appLinkUrl}
        onChange={(e: React.ChangeEvent<{ value: string }>) =>
          setAppLinkUrl(e.target.value)
        }
        // onChange={(e) => handleChange(e)}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"rmagazine://"}>楽天マガジン(iOS)</MenuItem>
        <MenuItem value={"fb179689808731959://"}>Magzter(iOS)</MenuItem>
        {/* <MenuItem value={"20"}>楽天マガジン(Android)</MenuItem> */}
      </Select>
    </FormControl>
  );
}
