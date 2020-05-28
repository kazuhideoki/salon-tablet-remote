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

export const SelectAppLink = () => {
  const classes = useStyles()
  const [value, setVaule] = React.useState(0)

  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setVaule(event.target.value as number);
  // };

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={(e: React.ChangeEvent<{ value: number }>) =>
          setVaule(e.target.value)
        }
        // onChange={(e) => handleChange(e)}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}
