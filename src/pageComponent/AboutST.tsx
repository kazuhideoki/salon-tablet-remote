import {
  makeStyles,
  Theme,
  Typography,
  createStyles,
  Grid,
  useMediaQuery,
} from '@material-ui/core';
import React from 'react';
import { server } from '../util/loadUrl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      display: 'flex',
    },
    item: {
      marginRight: 'auto',
      marginLeft: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
    },
    itemFlex: {
      width: '30%',
    },
    img: {
      display: 'block',
      margin: theme.spacing(0, 'auto', 6),
      // margin: theme.spacing(0, 0, 6),
      borderRadius: '50%',
      width: 200,
      height: 200,
      objectFit: 'cover',
    },
    typo: {
      margin: theme.spacing(6, 0),
    },
  })
);

export const AboutST = () => {
  const classes = useStyles();

  const isLargeDisplay = useMediaQuery('(min-width:600px)');

  return (
    <div>
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        align="center"
        className={classes.typo}>
        SALON TABLETとは?
      </Typography>
      <div className={isLargeDisplay ? classes.flex : ''}>
        <div
          className={`${classes.item} ${
            isLargeDisplay ? classes.itemFlex : ''
          }`}>
          {/* <div item > */}
          <img
            src={`${server}/images/hair_stylist.jpg`}
            className={classes.img}
          />
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            align="center"
            className={classes.typo}>
            お客さんと美容師らしいコミュニケーションはとれていますか？美容室のデジタル版ポップ作成のお手伝いで
            <br />
            SALON TABLETは単価アップに貢献します。
          </Typography>
        </div>

        <div
          className={`${classes.item} ${
            isLargeDisplay ? classes.itemFlex : ''
          }`}>
          {/* <div item > */}
          <img src={`${server}/images/manage_st.jpg`} className={classes.img} />
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            align="center"
            className={classes.typo}>
            顧客管理、雑誌アプリ、ヘアカタログ、インスタグラム、ポップ、検索...
            etc。現代の美容師には欠かせないデジタルツール。
            <br />
            SALON TABLETはきれいに整頓します。
          </Typography>
        </div>

        <div
          className={`${classes.item} ${
            isLargeDisplay ? classes.itemFlex : ''
          }`}>
          {/* <div item > */}
          <img
            src={`${server}/images/tablet_desk.jpg`}
            className={classes.img}
          />
          <Typography
            variant="body1"
            component="p"
            gutterBottom
            align="center"
            className={classes.typo}>
            おしゃれな美容室のインテリア、無機質なタブレット。
            <br />
            SALON TABLETはマッチングさせます。
          </Typography>
        </div>
      </div>
    </div>
  );
};
