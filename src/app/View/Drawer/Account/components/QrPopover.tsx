import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { TUseSettingUserInfoProps } from "../view/ManageUserInfo";
import QRCode from 'qrcode.react'
import { server } from "../../../../../lib/loadUrl";
import { useReactToPrint } from "react-to-print";
import { qrCodeForPrint } from "./qrCodeForPrint";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IconButton } from "@material-ui/core";
import { FileCopyOutlined, PrintOutlined } from "@material-ui/icons";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popOverRoot: {
      margin: theme.spacing(2),
      maxWidth: '90vw'
    },
    typography: {
      // padding: theme.spacing(2),
    },
    qrCode: {
      margin: theme.spacing(2),
    },
    url: {
      wordBreak: 'break-all',
    },
  })
);

export const QrPopover: React.FC<TUseSettingUserInfoProps> = (props) => {
         const classes = useStyles();
         const [
           qrAnchorEl,
           setQrAnchorEl,
         ] = React.useState<HTMLButtonElement | null>(null);

         const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
           setQrAnchorEl(event.currentTarget);
         };

         const handleClose = () => { 
           setQrAnchorEl(null);
         };

         const open = Boolean(qrAnchorEl);
         const id = open ? "qr-popover" : undefined;

         const ref = React.useRef()
         const handlePrint = useReactToPrint({
           content: () => ref.current,
           documentTitle: props.userInfo.shop_name,
         });

         const publicPageUrl = `${server}/public_page/${props.userInfo.public_page_slug}`

         const [isCopied, setIsCopied] = React.useState(false)

         return (
           <>
             <Button
               aria-label="qr-popover"
               aria-describedby={id}
               disabled={props.isShowMobile === false}
               onClick={handleClick}
             >
               {props.children}
             </Button>
             <Popover
               id={id}
               open={open}
               anchorEl={qrAnchorEl}
               onClose={handleClose}
               anchorOrigin={{
                 vertical: "top",
                 horizontal: "center",
               }}
               transformOrigin={{
                 vertical: "bottom",
                 horizontal: "center",
               }}
              //  className={classes.popOverRoot}
             >
               <div className={classes.popOverRoot}>
                  <Typography className={classes.typography}>
                    アクセスQRコード
                  </Typography>
                  {/* QRコード */}
                  <div className={classes.qrCode}>
                    <QRCode value={publicPageUrl} size={256} />
                  </div>
                  <Typography className={classes.url}>URL: {publicPageUrl}</Typography>
                  <CopyToClipboard
                    text={publicPageUrl}
                    onCopy={() => setIsCopied(true)}
                  >
                    <IconButton color='primary'><FileCopyOutlined/></IconButton>
                  </CopyToClipboard>
                  {isCopied ? <span style={{ color: "red" }}>Copied.</span> : null}

                  {/* <Button onClick={handlePrint}>印刷する</Button> */}
                  <IconButton onClick={handlePrint} color='primary'><PrintOutlined/></IconButton>

                  {/* 印刷用。 */}
                  <div style={{ display: "none" }}>
                    {/* <QrCodeForPrint {...props} ref={ref} /> */}
                    {qrCodeForPrint(props, ref)}
                  </div>

               </div>
             </Popover>
           </>
         );
       };
