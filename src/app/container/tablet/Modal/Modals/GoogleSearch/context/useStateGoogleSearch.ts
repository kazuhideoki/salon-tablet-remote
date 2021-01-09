import React from 'react';
export const useStateGoogleSearch = () => {
  const [field, setField] = React.useState('');
  const [query, setQuery] = React.useState('');

  const [searchHistoryStr, setSearchHistoryStr] = React.useState(
    localStorage.getItem('googleSearchHistory') || ''
  );

  const searchHistoryArr = searchHistoryStr ? searchHistoryStr.split(',') : [];

  return {
    field,
    setField,
    query,
    setQuery,
    setSearchHistoryStr,
    searchHistoryArr,
  };
};
