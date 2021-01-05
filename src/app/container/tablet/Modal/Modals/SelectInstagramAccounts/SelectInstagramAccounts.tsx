import React from 'react';
import {
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from '@material-ui/core';
import { useIsMobile } from '../../../../../../util/useIsMobile';
import { HelpButton } from '../../../../../components/HelpButton';
import { useManageInstagramAccountsProps } from '../../../Drawer/ManageInstagramAccounts/ManageInstagmaAccounts';
import { useStateSelectInstagramAccounts } from './context/useStateSelectInstagramAccounts';

export const useSelectInstagramAccountsProps = () => {
  const { instagramAccounts, isSetting } = useStateSelectInstagramAccounts();

  const { getInstagramMedias } = useManageInstagramAccountsProps();

  const isMobile = useIsMobile();

  return {
    isSetting,
    instagramAccounts,
    getInstagramMedias,
    isMobile,
  };
};
export type SelectInstagramAccountsPresenterProps = ReturnType<
  typeof useSelectInstagramAccountsProps
>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    header: {
      margin: theme.spacing(2),
    },
    account: {
      margin: theme.spacing(1),
    },
  })
);

export const SelectInstagramAccountsPresenter: React.FC<SelectInstagramAccountsPresenterProps> = (
  props
) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.header}>
        インスタグラムアカウント選択
      </Typography>
      {props.isMobile && props.isSetting ? (
        <>
          <br />
          <HelpButton content="「スマートフォン表示」ではInstagram公式サイト（アプリ）へ遷移します。(※タブレットモード同様に専用画面を実装予定)" />
        </>
      ) : null}
      {props.instagramAccounts.map((value, index) => {
        if (props.isMobile) {
          return (
            <a
              className={classes.account}
              href={`https://www.instagram.com/${value.username}/`}>
              <Button>{value.username}</Button>
            </a>
          );
        }
        return (
          <div key={index} className={classes.account}>
            <Button
              onClick={() =>
                props.getInstagramMedias(value.instagram_id, value.username, {})
              }
              disabled={value.is_reconnect_needed}>
              {value.username}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export const SelectInstagramAccounts = () => {
  const props = useSelectInstagramAccountsProps();

  return <SelectInstagramAccountsPresenter {...props} />;
};
