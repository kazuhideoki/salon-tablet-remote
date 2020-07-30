import React from 'react'
import {
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Button,
} from "@material-ui/core";
import { server, instagramRedirectHost } from '../../../config';
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2),
    },
  })
);

export const ManageInstagmaAccounts = () => {
  const classes = useStyles()

  const handleResisterInstagram = () => {
    // const res = await fetch(
    //   `https://${server}/instagram_accounts/connect_short`
    // );
    fetch(
      `https://api.instagram.com/oauth/authorize?client_id=298521954536312&redirect_uri=${server}/api/get_token/&scope=user_profile,user_media&response_type=code`
    );

  }

  // https://api.instagram.com/oauth/authorize?client_id=298521954536312&redirect_uri=https://localhost:3000/api/instagram_accounts/get_token/&scope=user_profile,user_media&response_type=code

  const instaAuth = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${instagramRedirectHost}/api/instagram_accounts/get_token&scope=user_profile,user_media&response_type=code`;

  return (
    <div>
      <Typography variant="h4" component="h2" className={classes.header}>
        タグ管理
      </Typography>
      {/* <Button onClick={() => handleResisterInstagram()}>
        インスタグラムアカウントを登録する
      </Button> */}
      <Button>
        {/* <Link href="https://api.instagram.com/oauth/authorize?client_id=298521954536312&redirect_uri=${server}/api/instagram_accounts/get_token/&scope=user_profile,user_media&response_type=code" >
          インスタグラムアカウントを登録する
        </Link> */}
        <a href={instaAuth}>インスタグラムアカウントを登録する</a>
      </Button>
    </div>
  );
}
