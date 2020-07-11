import React from 'react'
import { Home } from '@material-ui/icons';
import { useGetArticles } from '../../../ActionCreator/articles/useGetArticles';

type Props = {
  className?: string
  getArticles: (page: number) => Promise<void>
}

export const HomeButton = ({ className, getArticles}: Props) => {
  

  return <Home onClick={() => getArticles(1)} className={className ? className : ""} />
}
