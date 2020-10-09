import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, makeStyles, Theme, createStyles } from "@material-ui/core";

export const useGoogleSearchProps = () => {
  const [update, setUpdate] = React.useState(false)
  const [field, setField] = React.useState('')
  const [query, setQuery] = React.useState('')
  console.log('queryは ' + query)

  const [searchHistoryStr, setSearchHistoryStr] = React.useState(localStorage.getItem(
    "googleSearchHistory")
  )

  const searchHistoryArr = searchHistoryStr ? searchHistoryStr.split(',') : []

  const handleOnChange = value => {
    setField(value)
    setQuery(value.replace(/ /g, "+"))
  }

  const hancleOnClick = () => {

    const str: TGoogleSearchHistory = localStorage.getItem(
      "googleSearchHistory"
    )
    console.log('strは ' + str);

    let newStr

    if (str) {
      let arr = []
      arr = str.split(',')
      const newArr = arr.includes(field) ? arr : arr.concat(field)
      newStr = newArr.toString()

    } else {
      newStr = field
    }

    console.log('newStrは ' + newStr)
    localStorage.setItem("googleSearchHistory", newStr);

    setField('')
    setUpdate(!update)

  }

  const clearHistory = () => {
    localStorage.setItem("googleSearchHistory", '');
  }

  return {
    update,
    field,
    setField,
    query,
    searchHistoryArr,
    handleOnChange,
    hancleOnClick,
    clearHistory,
  }
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
    <div className={classes.root} >
      <Autocomplete
        freeSolo
        id="google-search"
        disableClearable
        // options={top100Films.map((option) => option.title)}
        options={props.searchHistoryArr.map((value) => value)}
        renderInput={(params) => (
          <TextField
            {...params}
            className={classes.textField}
            value={props.field}
            // onChange={(e) => props.setField(e.target.value)}
            onChange={(e) => props.handleOnChange(e.target.value)}
            // onKeyPress={(e) => {
            //   if (e.key == "Enter") {
            //     e.preventDefault();
            //     location.href = `https://www.google.com/search?newwindow=1&q=${props.query}`
            //   }
            // }}
            autoFocus
            label="Google 検索"
            margin="normal"
            InputProps={{ ...params.InputProps, type: "search" }}
          />
        )}
      />
      <a
        href={`https://www.google.com/search?newwindow=1&q=${props.query}`}
        // href={`https://www.google.com/webhp?ion=1&espv=2&es_th=1&ie=UTF-8#q=${props.field.replace(/ /g, "+")}`}
        rel="noopener noreferrer"
        target="_blank"
        className={classes.a}
      >
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={props.hancleOnClick}
        >
          検索
        </Button>
      </a>
      <Button onClick={props.clearHistory} variant='outlined'>
        検索履歴クリア
      </Button>
    </div>
  );
}

export const GoogleSearch = () => {
  const props = useGoogleSearchProps()

  return <GoogleSearchPresenter {...props}/>
}

// // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   { title: "The Shawshank Redemption", year: 1994 },
//   { title: "The Godfather", year: 1972 },
//   { title: "The Godfather: Part II", year: 1974 },
//   { title: "The Dark Knight", year: 2008 },
//   { title: "12 Angry Men", year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: "Pulp Fiction", year: 1994 },
//   { title: "The Lord of the Rings: The Return of the King", year: 2003 },
//   { title: "The Good, the Bad and the Ugly", year: 1966 },
//   { title: "Fight Club", year: 1999 },
//   { title: "Rear Window", year: 1954 },
//   { title: "The Pianist", year: 2002 },
//   { title: "The Departed", year: 2006 },
//   { title: "Terminator 2: Judgment Day", year: 1991 },
//   { title: "Back to the Future", year: 1985 },
//   { title: "Whiplash", year: 2014 },
//   { title: "Das Boot", year: 1981 },
//   { title: "Citizen Kane", year: 1941 },
//   { title: "North by Northwest", year: 1959 },
//   { title: "Vertigo", year: 1958 },
//   { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
//   { title: "Reservoir Dogs", year: 1992 },
//   { title: "Braveheart", year: 1995 },
//   { title: "M", year: 1931 },
//   { title: "Requiem for a Dream", year: 2000 },
//   { title: "Amélie", year: 2001 },
//   { title: "A Clockwork Orange", year: 1971 },
//   { title: "Like Stars on Earth", year: 2007 },
//   { title: "Taxi Driver", year: 1976 },
//   { title: "Lawrence of Arabia", year: 1962 },
//   { title: "Double Indemnity", year: 1944 },
//   { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
//   { title: "Amadeus", year: 1984 },
//   { title: "To Kill a Mockingbird", year: 1962 },
//   { title: "Toy Story 3", year: 2010 },
//   { title: "Logan", year: 2017 },
//   { title: "Full Metal Jacket", year: 1987 },
//   { title: "Dangal", year: 2016 },
//   { title: "The Sting", year: 1973 },
//   { title: "2001: A Space Odyssey", year: 1968 },
//   { title: "Singin' in the Rain", year: 1952 },
//   { title: "Toy Story", year: 1995 },
//   { title: "Bicycle Thieves", year: 1948 },
//   { title: "The Kid", year: 1921 },
//   { title: "Inglourious Basterds", year: 2009 },
//   { title: "Snatch", year: 2000 },
//   { title: "3 Idiots", year: 2009 },
//   { title: "Monty Python and the Holy Grail", year: 1975 },
// ];
