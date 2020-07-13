import React from 'react'
import { Home } from '@material-ui/icons';
import { useGetArticles } from '../../../ActionCreator/articles/useGetArticles';
import { Typography } from '@material-ui/core';

type Props = {
  className?: string
  getArticles?: (page: number) => Promise<void>
}

export const HomeButton = ({ className, getArticles}: Props) => {
  

  return ( 
    <Typography variant="subtitle1" component="span">
      <Home onClick={() => getArticles(1)} className={className ? className : ""} />
    </Typography>
    )
}
