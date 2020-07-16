import React from 'react'
import { Home, LocalOffer } from '@material-ui/icons';
import { useGetArticles } from '../../../ActionCreator/articles/useGetArticles';
import { Typography } from '@material-ui/core';

type Props = {
  className?: string
}

export const TagsButton = ({ className }: Props) => {


  return (
    <LocalOffer className={className ? className : ""} />
  )
}
