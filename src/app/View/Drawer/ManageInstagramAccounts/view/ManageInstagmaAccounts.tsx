import React from 'react'
import {
  Typography,
  makeStyles,
  createStyles,
  Theme,
  Button,
} from "@material-ui/core";
import { instagramRedirectHost } from '../../../../../lib/loadUrl';
import { Store } from '../../../../Store/Store';
import { DeleteButton } from '../../../../pureComponents/buttons/DeleteButton';
import { Skeleton } from '@material-ui/lab';
import { useDeleteInstagramAccount } from '../context/useDeleteInstagramAccount';
import { useGetInstagramMedias } from '../context/useGetInstagramMedias';

export const useManageInstagramAccountsProps = () => {

  const { appState } = React.useContext(Store);
  const {instagramAccounts, loading} = appState

  const deleteInstagramAccount = useDeleteInstagramAccount()
  const getInstagramMedias = useGetInstagramMedias()

  const instaAuth = `https://api.instagram.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID}&redirect_uri=${instagramRedirectHost}/api/instagram_accounts/get_token&scope=user_profile,user_media&response_type=code`;

  return {
    instagramAccounts,
    getInstagramMedias,
    instaAuth,
    deleteInstagramAccount,
    loading: loading.manageInstagramAccounts,
  };
}
type Props = ReturnType<typeof useManageInstagramAccountsProps>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2),
    },
    header: {
      margin: theme.spacing(2),
    },
    txt: {
      margin: theme.spacing(2),
      color: "grey",
    },
    account: {
      display: "flex",
      margin: theme.spacing(1),
    },
    reconnect_needed: {
      color: theme.palette.error.main,
    },
    connectButton: {
      textDecoration: "none",
    },
    skeleton: {
      width: 160,
      height: 38,
      borderRadius: 4,
    },
  })
);

export const ManageInstagramAccountsPresenter:React.FC<Props> = (props) => {
  const classes = useStyles();

  const displayInstagramAccounts = props.instagramAccounts.map((value) => {
    if (props.loading) {
      return (
        <Skeleton
          variant="rect"
          className={`${classes.account} ${classes.skeleton}`}
        />
      );
    }

    return (
      <div className={classes.account}>
        <Button
          disabled={value.is_reconnect_needed}
          onClick={() =>
            props.getInstagramMedias(value.instagram_id, value.username, {})
          }
        >
          {value.username}
        </Button>
        {value.is_reconnect_needed ? (
          <a href={props.instaAuth} className={classes.connectButton}>

            <Button
              className={classes.reconnect_needed}
              variant="text"
            >
              要再連携
            </Button>
          </a>
        ) : null}
        <DeleteButton
          onClick={props.deleteInstagramAccount}
          value={value.instagram_id}
        />
      </div>
    );
  });

  const noInstagramAccounts = (
    <Typography variant="subtitle1">Instagramと連携されていません</Typography>
  );

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.header}>
        Instagram アカウント管理
      </Typography>

      <a href={props.instaAuth} className={classes.connectButton}>
        <Button>インスタグラムアカウントと連携する</Button>
      </a>
      <Typography variant="subtitle1" component="p" className={classes.txt}>
        現在Instagramの連携は招待制になっています。ご希望の方はご連絡下さい。
      </Typography>
      {props.instagramAccounts.length
        ? displayInstagramAccounts
        : noInstagramAccounts}
    </div>
  );
};

export const ManageInstagramAccounts = () => {
  const props = useManageInstagramAccountsProps()

  return <ManageInstagramAccountsPresenter {...props}/>
}
