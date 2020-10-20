import { makeStyles, Theme, Typography,createStyles } from '@material-ui/core'
import React from 'react'
import { server } from '../lib/loadUrl';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      display: 'block',
      margin: theme.spacing(0, 'auto', 6),
      borderRadius: '50%',
      width: 300,
      height: 300,
      objectFit: 'cover',
    },
    typo: {
      margin: theme.spacing(5, 2),
    },
  })
);

export const AboutST = () => {
  const classes = useStyles()

  return (
    <div>
      <Typography variant='h3' component='h2' gutterBottom align='center' className={classes.typo}>
        SALON TABLETとは?
      </Typography>
      <img src={`${server}/images/hair_stylist.jpg`} className={classes.img}/>
      <Typography variant='body1' component='p' gutterBottom align='center' className={classes.typo}>
        {/* 雑誌を読みながらリラックス。美容師さんとの楽しいいおしゃべり。これらも当然美容室が提供する価値。そして、美容師だからこそできる「ヘア」「美容」の話も提供できる価値ですよね。SALON TABLETは美容室におけるデジタル版ポップ作成プラットフォームの役割を果たすことで単価アップのお手伝いをします。 */}
        お客さんと美容師らしいコミュニケーションはとれていますか？美容室のデジタル版ポップ作成のお手伝いで<br/>SALON TABLETは単価アップに貢献します。
      </Typography>
        {/* <Parallax y={[-50, 50]}> */}

          <img src={`${server}/images/manage_st.jpg`} className={classes.img}/>
        {/* </Parallax> */}
      <Typography variant='body1' component='p' gutterBottom align='center' className={classes.typo}>
         顧客管理、雑誌アプリ、ヘアカタログ、インスタグラム、ポップ、検索... etc。現代の美容師には欠かせないデジタルツール。<br/>SALON TABLETはきれいに整頓します。
      </Typography>
      <img src={`${server}/images/hair_stylist.jpg`} className={classes.img}/>
      <Typography variant='body1' component='p' gutterBottom align='center' className={classes.typo}>
        {/* あなたの美容室のこだわりインテリア、タブレットとマッチしていますか？美容室が作り上げたい世界観、SALON TABLETはそこに寄り添います。美容室に合わせたテーマを選ぶことで手軽にタブレットをイメチェン！さらにこだわり派の方のために細かいカスタマイズもできます。 */}
        おしゃれな美容室のインテリア、無機質なタブレット。<br/>SALON TABLETはマッチングさせます。
      </Typography>
    </div>
  )
}
