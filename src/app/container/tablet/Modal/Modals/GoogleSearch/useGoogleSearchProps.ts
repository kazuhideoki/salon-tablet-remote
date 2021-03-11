import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useHandleOnClick } from './context/useHandleOnClick';
import { useHandleOnChange } from './context/useHandleOnChange';
import { useStateGoogleSearch } from './context/useStateGoogleSearch';
import { useClearHistory } from './context/useClearHistory';

export const useGoogleSearchProps = () => {
  const {
    field,
    setField,
    query,
    setQuery,
    setSearchHistoryStr,
    searchHistoryArr,
  } = useStateGoogleSearch();

  const handleOnChange = useHandleOnChange(setField, setQuery);

  const handleOnClick = useHandleOnClick(field, setField, setSearchHistoryStr);

  const clearHistory = useClearHistory();

  return {
    field,
    setField,
    query,
    searchHistoryArr,
    handleOnChange,
    handleOnClick,
    clearHistory,
  };
};

export type GoogleSearchPresenterProps = ReturnType<
  typeof useGoogleSearchProps
>;
