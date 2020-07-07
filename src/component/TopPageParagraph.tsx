import React from 'react'
import { Typography } from '@material-ui/core';

export const TopPageParagraph = () => {
  return (
    <>
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        // className={classes.typography}
      >
        SALON TABLET
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        〜美容師がサロンワークでタブレットを使いこなすためのウェブサービス〜
      </Typography>
      <Typography variant="body1" component="h2" gutterBottom>
        美容室でタブレットをどのように活用していますか？雑誌のアプリでしょうか？スタイル写真を見せたり？
        ごちゃごちゃしがちなタブレットを一画面で管理します。更に美容師からの情報発信をサポートすることで、美容師のサロンワークの手助けをします！
      </Typography>
    </>
  );
}
