import React from 'react'
import { Home } from '@material-ui/icons';
import { useGetArticles } from '../../../ActionCreator/articles/useGetArticles';
import { Typography } from '@material-ui/core';

type Props = {
  className?: string
}

export const HomeButton = ({ className }: Props) => {
  

  return ( 
      <Home className={className ? className : ""} />
    )
}
