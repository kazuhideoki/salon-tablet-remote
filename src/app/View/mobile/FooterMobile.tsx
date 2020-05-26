import React from 'react'
import { usePFooterProps } from "../PFooter/PFooter";
import { IconsSetting } from '../Setting/iconSelect/icons';
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { MoodBad } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) => {
  // const themes = React.useContext(ThemeContext);
  return createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
  });
});

export const FooterMobile = () => {
  const classes = useStyles()
  const {
    appState,
    openModal,
    dispatchAppState,
    footerItems,
    handleOnUpDateFooterIcon,
    handleOnDeleteFooterItem,
  } = usePFooterProps();

  const Icon = (props) => <props.icon/>

  return (
    <div>
      {footerItems.map((value, key) => {
      // アイコン名を該当アイコンコンポーネントに変換
      const icon = value.displayed_icon_name ? IconsSetting.convertIconComponentFromName(
        value.displayed_icon_name)[0] : MoodBad

        return (
          <div className={classes.root} key={key}>
            <Icon icon={icon} />
            <div>{value.icon_name}</div>
            <div>{value.item_content}</div>
            <button
              onClick={() => handleOnUpDateFooterIcon(value.footer_item_id)}
            >
              編集
            </button>
            <button
              onClick={() =>
                handleOnDeleteFooterItem(value.footer_item_id, value.order)
              }
            >
              削除
            </button>
          </div>
        );
      })}
    </div>
  );
}
