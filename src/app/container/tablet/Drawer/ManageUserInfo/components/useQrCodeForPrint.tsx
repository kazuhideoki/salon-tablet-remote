import React from 'react';
import { Typography, useTheme } from '@material-ui/core';
import { SettingUserInfoPresenterProps } from '../ManageUserInfo';
import QRCode from 'qrcode.react';
import { server } from '../../../../../../util/loadUrl';

const width = 450;

// FCにするとuseReactToPrintでエラーがでてしまうのでhooksにした。
export const useQrCodeForPrint = (
  props: SettingUserInfoPresenterProps,
  ref: React.MutableRefObject<null>
) => {
  const theme = useTheme();

  return (
    <div ref={ref} style={{ width: width, padding: theme.spacing(4) }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        {props.userInfo.shop_name}
      </Typography>
      <Typography align="center" gutterBottom>
        <QRCode
          value={`${server}/public_page/${props.userInfo.public_page_slug}`}
          size={width}
        />
      </Typography>
      <Typography variant="h4" component="p" align="center">
        QRコードを読み取って{props.userInfo.shop_name}
        の更新情報をチェックしよう！
      </Typography>
    </div>
  );
};
