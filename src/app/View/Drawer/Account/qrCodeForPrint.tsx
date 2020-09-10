import React from 'react'
import { Typography, useTheme } from '@material-ui/core';
import { TUseSettingUserInfoProps } from './SettingUserInfo';
import QRCode from 'qrcode.react'
import { server } from '../../../../lib/loadUrl';

type Props = TUseSettingUserInfoProps &  {ref: React.MutableRefObject<undefined>}

const width = 400
// const theme = useTheme()

export const qrCodeForPrint = (
         props: TUseSettingUserInfoProps,
         ref: React.MutableRefObject<undefined>
       ) => {
         const theme = useTheme();

         return (
           <div ref={ref} style={{ width: width, padding: theme.spacing(2)}}>
             <Typography
               variant="h1"
               component="h1"
               align="center"
               gutterBottom
             >
               {props.userInfo.shop_name}
             </Typography>
             <Typography align="center" gutterBottom>
               <QRCode
                 value={`${server}/public_page/${props.userInfo.public_page_slug}`}
                 size={width}
               />
             </Typography>
             <Typography variant="h3" component="p" align="center">
               QRコードを読み取って{props.userInfo.shop_name}
               の更新情報をチェックしよう！
             </Typography>
           </div>
         );
       };
