import { makeStyles, Theme, Typography,createStyles } from '@material-ui/core'
import React from 'react'
import { server } from '../lib/loadUrl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      borderRadius: '50%',
      width: 300,
      // height: 'auto',
      height: 300,
      objectFit: 'cover',
    },
  })
);

export const AboutST = () => {
  const classes = useStyles()

  return (
    <div>
      <img src={`${server}/images/icons/icon-512x512.png`} className={classes.img}/>
      <Typography variant='body1' component='p' gutterBottom>
        雑誌を読みながらリラックス。美容師さんとの楽しいいおしゃべり。これらも当然美容室が提供する価値。そして、美容師だからこそできる「ヘア」「美容」の話も提供できる価値ですよね。SALON TABLETは美容室におけるデジタル版ポップの役割を果たすことで単価アップのお手伝いをします。
      </Typography>
      <img src={`${server}/images/manage_st.jpg`} className={classes.img}/>
      <Typography variant='body1' component='p' gutterBottom>
         顧客管理、雑誌アプリ、ヘアカタログ、インスタグラム、ブログ、ポップ、検索... etc。現代の美容師には欠かせないデジタルツール。きれいに整理整頓できていますか？SALON TABLETを使うことで、美容師とお客さんが共にに使いやすくまとめることができます。
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        せっかくの美容室のこだわりインテリア、タブレットとマッチしていますか？美容室が作り上げたい世界観、SALON TABLETはそこに寄り添います。美容室に合わせたテーマを選ぶことで手軽にタブレットをイメチェン！さらにこだわり派の方のために細かいカスタマイズもできます。
      </Typography>
    </div>
  )
}
