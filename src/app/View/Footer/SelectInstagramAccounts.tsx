import React from 'react'
import { Typography, makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import { Store } from '../../Store/Store';
import { useGetInstagramMedias } from '../../ActionCreator/instagramMedias/useGetInstagramMedias';

export const useSelectInstagramAccountsProps = () => {

  const { instagramAccounts, dispatchAppState } = React.useContext(Store);
  const getInstagramMedias = useGetInstagramMedias()

  return {
    instagramAccounts,
    getInstagramMedias,
  };
}
type Props = ReturnType<typeof useSelectInstagramAccountsProps>

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    header: {
      padding: theme.spacing(2),
    },
    account: {
      margin: theme.spacing(1),
    },
  })
);

export const SelectInstagramAccountsPresenter:React.FC<Props> = (props) => {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.header}>
        インスタグラムアカウント選択
      </Typography>
      {props.instagramAccounts.map((value) => {
        return (
          <div className={classes.account}>
            <Button
              onClick={() => props.getInstagramMedias(value.instagram_id)}
            >
              {value.username}
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export const SelectInstagramAccounts = () => {
  const props = useSelectInstagramAccountsProps();

  return <SelectInstagramAccountsPresenter {...props} />;
};

