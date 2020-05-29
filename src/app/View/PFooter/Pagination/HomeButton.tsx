import React from 'react'
import { Home } from '@material-ui/icons';
import { useGetArticles } from '../../../ActionCreator/articles/useGetArticles';

type Props = {
  className?: string
}

export const HomeButton = ({ className}: Props) => {
  const getArticles = useGetArticles()

  return <Home onClick={() => getArticles(1)} className={className ? className : ""} />
}
