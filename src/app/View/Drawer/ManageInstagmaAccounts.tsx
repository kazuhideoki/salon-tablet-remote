import React from 'react'
import {
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Button,
} from "@material-ui/core";
import { instagramRedirectHost } from '../../../config';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(2),
    },
  })
);

export const ManageInstagmaAccounts = () => {
  const classes = useStyles()

  const instaAuth = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${instagramRedirectHost}/api/instagram_accounts/get_token&scope=user_profile,user_media&response_type=code`;

  return (
    <div>
      <Typography variant="h4" component="h2" className={classes.header}>
        Instagram アカウント管理
      </Typography>

      <a href={instaAuth}>
        <Button>インスタグラムアカウントを登録する</Button>
      </a>
    </div>
  );
}
