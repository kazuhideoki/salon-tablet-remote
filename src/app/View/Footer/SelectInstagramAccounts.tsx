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
    header: {
      padding: theme.spacing(2),
    },
  })
);

export const SelectInstagramAccountsPresenter:React.FC<Props> = (props) => {
  const classes = useStyles()
  
  return (
    <div>
      <Typography variant="h4" component="h2" className={classes.header}>
        インスタグラムアカウント選択
      </Typography>
      {props.instagramAccounts.map((value) => {
        return (
          <div>
            <Button onClick={() => props.getInstagramMedias(value.instagram_id)}>{value.username}</Button>
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

