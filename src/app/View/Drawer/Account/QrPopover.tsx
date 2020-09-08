import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import { Help } from "@material-ui/icons";
import { type } from "os";
import { TUseSettingUserInfoProps } from "./SettingUserInfo";
// var QRCode = require("qrcode.react");
import QRCode from 'qrcode.react'
import { server } from "../../../../lib/loadUrl";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
    },
    typography: {
      padding: theme.spacing(2),
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
               className={classes.root}
             >
               <Typography className={classes.typography}>
                 アクセスQRコード
               </Typography>
               {/* QRこーど */}
               <QRCode value={`${server}/public_page/${props.userInfo.public_page_slug}`} />
             </Popover>
           </>
         );
       };
