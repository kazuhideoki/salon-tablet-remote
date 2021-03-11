import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import {
  GoogleSearchPresenterProps,
  useGoogleSearchProps,
} from './useGoogleSearchProps';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      padding: theme.spacing(2),
    },
    textField: {
      marginRight: theme.spacing(2),
      minWidth: 300,
      maxWidth: '90vw',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    a: {
      textDecoration: 'none',
      color: theme.palette.text.primary,
    },
  });
});

export const GoogleSearchPresenter: React.FC<GoogleSearchPresenterProps> = (
  props
) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        freeSolo
        id="google-search"
        disableClearable
        options={props.searchHistoryArr.map((value) => value)}
        onChange={(e, value) => props.handleOnChange(value)} // 選択時にfieldとqueryに反映させるために必要
        renderInput={(params) => (
          <TextField
            {...params}
            className={classes.textField}
            value={props.field}
            onChange={(e) => props.handleOnChange(e.target.value)}
            autoFocus
            label="Google 検索"
            margin="normal"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
      <a
        href={`https://www.google.com/search?newwindow=1&q=${props.query}`}
        rel="noopener noreferrer"
        target="_blank"
        className={classes.a}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={props.handleOnClick}>
          検索
        </Button>
      </a>
      <a
        href={`https://www.google.com/search?newwindow=1&tbm=isch&q=${props.query}`}
        rel="noopener noreferrer"
        target="_blank"
        className={classes.a}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={props.handleOnClick}>
          画像検索
        </Button>
      </a>
    </div>
  );
};

export const GoogleSearch = () => {
  const props = useGoogleSearchProps();

  return <GoogleSearchPresenter {...props} />;
};
