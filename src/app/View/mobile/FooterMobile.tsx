import React from 'react'
import { usePFooterProps } from "../PFooter/PFooter";
import { IconsSetting } from '../Setting/iconSelect/icons';
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import { MoodBad, ArrowUpward } from "@material-ui/icons";
import { useSwitchOrder } from '../../ActionCreator/footerItems/useSwitchOrder';
import { useDrawerProps } from '../Drawer';

export const useFooterMobileProps = () => {
  const {
    appState,
    openModal,
    dispatchAppState,
    footerItems,
    handleOnUpDateFooterIcon,
    handleOnDeleteFooterItem,
  } = usePFooterProps();

  // const { handleOpenFooterItemEditor } = useDrawerProps();

  const switchOrder = useSwitchOrder();

  return {
    appState,
    openModal,
    dispatchAppState,
    footerItems,
    handleOnUpDateFooterIcon,
    handleOnDeleteFooterItem,
    // handleOpenFooterItemEditor,
    switchOrder,
  };
}

type Props = ReturnType<typeof useFooterMobileProps>

const useStyles = makeStyles((theme: Theme) => {
  // const themes = React.useContext(ThemeContext);
  return createStyles({
    root: {
      overflowY: "scroll",
      flexGrow: 1,
      width: "100%",
    },
    items: {
      overflowY: "scroll",
    },
    item: {
      border: "1px solid black",
    },
    itemIsDraft: {
      border: "1px solid red",
      borderRadius: 2,
      fontStyle: "italic",
    },
  });
});

export const FooterMobilePresenter:React.FC<Props> = (props) => {
  const classes = useStyles()

  const Icon = (props) => <props.icon/>

  return (
    <div className={classes.root}>
      
      <div className={classes.items}>
        {props.footerItems.length === 0 ? (
          <div className={classes.item}>アイテムがありません</div>
        ) : (
          props.footerItems.map((value, index) => {
            // アイコン名を該当アイコンコンポーネントに変換
            const icon = value.displayed_icon_name
              ? IconsSetting.convertIconComponentFromName(
                  value.displayed_icon_name
                )[0]
              : MoodBad;

            return (
              <div key={index} className={classes.item}>
                <div>
                  <Icon icon={icon} />
                  アイテム名{value.icon_name}
                  {value.is_published || (
                    <span className={classes.itemIsDraft}>下書き</span>
                  )}
                </div>
                {value.on_tap === "modal" ? (
                  <div>
                    {value.item_excerpt}
                    {/* 抜粋が100文字の場合"..."追加" */}
                    {value.item_excerpt.length === 100 ? "..." : ""}
                  </div>
                ) : null}
                <button
                  onClick={() =>
                    props.handleOnUpDateFooterIcon(value.footer_item_id)
                  }
                >
                  編集
                </button>
                <button
                  onClick={() =>
                    props.handleOnDeleteFooterItem(
                      value.footer_item_id,
                      value.order
                    )
                  }
                >
                  削除
                </button>
                {index !== 0 ? (
                  <button
                    onClick={() =>
                      props.switchOrder({
                        footer_item_id: value.footer_item_id,
                        order: value.order,
                      })
                    }
                  >
                    <ArrowUpward />
                    入れ替え
                  </button>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export const FooterMobile = () => {
  const props = useFooterMobileProps()

  return <FooterMobilePresenter {...props}/>
}
