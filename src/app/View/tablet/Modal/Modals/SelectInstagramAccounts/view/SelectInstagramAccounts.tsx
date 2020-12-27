import React from 'react'
import { Typography, makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import { useIsMobile } from '../../../../../../../lib/useIsMobile';
import { HelpButton } from '../../../../../../pureComponents/buttons/HelpButton';
import { useManageInstagramAccountsProps } from '../../../../Drawer/ManageInstagramAccounts/view/ManageInstagmaAccounts';

export const useSelectInstagramAccountsProps = () => {

  const { instagramAccounts, isSetting } = useSelectInstagramAccountsProps()

  const getInstagramMedias = useManageInstagramAccountsProps()

  const isMobile = useIsMobile()

  return {
    isSetting,
    instagramAccounts,
    getInstagramMedias,
    isMobile,
  };
}
type Props = ReturnType<typeof useSelectInstagramAccountsProps>

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

export const SelectInstagramAccountsPresenter:React.FC<Props> = (props) => {
  const classes = useStyles()
  
  return (
    <div className={classes.root}>
      <Typography variant="h4" component="h2" className={classes.header}>
        インスタグラムアカウント選択
      </Typography>
      {props.isMobile && props.isSetting ? <><br/><HelpButton content='「スマートフォン表示」ではInstagram公式サイト（アプリ）へ遷移します。(※タブレットモード同様に専用画面を実装予定)' /></> : null}
      {props.instagramAccounts.map((value) => {
        if (props.isMobile) {
          return (
            <a className={classes.account} href={`https://www.instagram.com/${value.username}/`}>
              <Button>
                {value.username}
              </Button>
            </a>
          );
        }
        return (
          <div className={classes.account}>
            <Button
              onClick={() => props.getInstagramMedias(value.instagram_id, value.username, {})}
              disabled={value.is_reconnect_needed}
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

