import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, makeStyles, Theme, createStyles } from "@material-ui/core";

 const deleteExcessSpace = (str: string) => {
   let newStr = str.trim()
   return newStr.replace(/\s+/g, " ");
 }

export const useGoogleSearchProps = () => {
  const [field, setField] = React.useState('')
  const [query, setQuery] = React.useState('')

  const [searchHistoryStr, setSearchHistoryStr] = React.useState(localStorage.getItem(
    "googleSearchHistory")
  )

  const searchHistoryArr = searchHistoryStr ? searchHistoryStr.split(',') : []

  const handleOnChange = value => {
    setField(value)
    setQuery(deleteExcessSpace(value).replace(/ /g, "+"))
  }

  const handleOnClick = () => {
    setField('') // 効かない？

    const str: TGoogleSearchHistory = localStorage.getItem(
      "googleSearchHistory"
    )

    let newStr
    let fieldStr = deleteExcessSpace(field)
    
    if (!fieldStr) {
      return null      
    }

    if (str) {
      let arr = []
      arr = str.split(',')
      const newArr = arr.includes(fieldStr) ? arr : arr.concat(fieldStr)
      newStr = newArr.toString()

    } else {
      newStr = fieldStr
    }

    localStorage.setItem("googleSearchHistory", newStr);

    
    setSearchHistoryStr(localStorage.getItem(
      "googleSearchHistory"))
  }

  const clearHistory = () => {
    const deleting = confirm('Googleの検索履歴を削除してもよろしいですか？')
    if (deleting) {
      localStorage.setItem("googleSearchHistory", '');
      alert('履歴を削除しました。')
    }
  }

  return {
    field,
    setField,
    query,
    searchHistoryArr,
    handleOnChange,
    handleOnClick,
    clearHistory,
  };
}

export type TUseGoogleSearchProps = ReturnType<typeof useGoogleSearchProps>

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
    }
  });
});

type TGoogleSearchHistory = string

export const GoogleSearchPresenter: React.FC<TUseGoogleSearchProps> = (props) => {
  const classes = useStyles()

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
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
      <a
        href={`https://www.google.com/search?newwindow=1&q=${props.query}`}
        rel="noopener noreferrer"
        target="_blank"
        className={classes.a}
      >
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={props.handleOnClick}
        >
          検索
        </Button>
      </a>
      <a
        href={`https://www.google.com/search?newwindow=1&tbm=isch&q=${props.query}`}
        rel="noopener noreferrer"
        target="_blank"
        className={classes.a}
      >
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={props.handleOnClick}
        >
          画像検索
        </Button>
      </a>
    </div>
  );
}

export const GoogleSearch = () => {
  const props = useGoogleSearchProps()

  return <GoogleSearchPresenter {...props}/>
}