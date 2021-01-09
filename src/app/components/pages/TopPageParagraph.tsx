import React from 'react';
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      margin: theme.spacing(2),
      marginBottom: 200,
    },
  })
);

type Props = {
  className?: string;
};

export const TopPageParagraph: React.FC<Props> = ({ className }) => {
  const classes = useStyles();
  return (
    <div className={className}>
      {/* <Typography align="center" variant="h1" component="h1" gutterBottom>
        SALON TABLET
      </Typography> */}
      <Typography
        className={classes.typography}
        align="center"
        variant="h3"
        component="h1"
        gutterBottom>
        「美容室」×「タブレット」をよりよく
      </Typography>
      <Typography
        className={classes.typography}
        variant="body1"
        component="h2"
        align="center"
        gutterBottom>
        美容室のためのタブレット専用ウェブアプリ
        {/* 美容室でタブレットをどのように活用していますか？雑誌のアプリでしょうか？スタイル写真を見せたり？
        SALON
        TABLETは無機質なタブレットを美容室のインテリア似合わせてカスタマイズできるウェブアプリです。
        ごちゃごちゃしがちなタブレットの中身をを一画面で管理、更に美容師からの情報発信をサポートすることで美容師のサロンワークの手助けをします！ */}
      </Typography>
    </div>
  );
};
