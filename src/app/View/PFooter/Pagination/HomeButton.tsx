import React from 'react'
import { Home } from '@material-ui/icons';
import { useGetArticles } from '../../../ActionCreator/articles/useGetArticles';

type Props = {
  classes?: any
}

export const HomeButton = ({classes}: Props) => {
  const getArticles = useGetArticles()

  return <Home onClick={() => getArticles(1)} className={classes.icon} />
}
