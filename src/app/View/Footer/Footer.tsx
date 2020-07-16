import React, { useContext } from "react";
import { Grid, makeStyles, createStyles, useMediaQuery } from "@material-ui/core";
import { MoodBad } from "@material-ui/icons";
import { Store, T_footer_item_id, T_order } from "../../Store/Store";
import { IconAndText } from "./IconAndText";
import { PPagination } from './Pagination/PPagination';
import { UpdateButton } from "../viewComponents/buttons/UpdateButton";
import { DeleteButton } from "../viewComponents/buttons/DeleteButton";
import { SwitchOrderButton } from "../viewComponents/buttons/SwitchOrderButton";
import { useGetFooterItem } from "../../ActionCreator/footerItems/useGetFooterItem";
import { useDeleteFooterItem } from "../../ActionCreator/footerItems/useDeleteFooterItem";
import { EditorContext } from "../../Store/EditorContext";
import { IconsSetting } from "../Drawer/ItemEditor/iconSelect/icons";
import { EditButtonsBox } from "../viewComponents/buttons/EditButtonsBox";
import { yellow } from "@material-ui/core/colors";

export const useFooterProps = () => {
  const { appState, dispatchAppState, footerItems } = useContext(Store);
  // modalNameをもとにModalで分岐してどのモーダルウィンドウを表示させるか決める

  const openModal = (item_content: string) => {
    // footerItemは記事タイトルがないので、titleはnull
    dispatchAppState({
      type: "SET_MODAL_CONTENT",
      payload: { title: null, content: item_content },
    });
    dispatchAppState({ type: "OPEN_MODAL", payload: "content_modal" });
  };

  const { setIsEdittingContent } = React.useContext(EditorContext);
  const getFooterItem = useGetFooterItem();
  const deleteFooterItem = useDeleteFooterItem();

  const handleOnUpDateFooterIcon = (
    footer_item_id: T_footer_item_id
  ) => {
    dispatchAppState({
      type: "OPEN_MODAL",
      payload: "edit_footer_item",
    });
    setIsEdittingContent(true);
    getFooterItem(footer_item_id);
  };
  const handleOnDeleteFooterItem = (
    footer_item_id: T_footer_item_id,
    order: T_order
  ) => {
    const deleting = confirm("本当に削除してよろしいですか？");
    deleting ? deleteFooterItem(footer_item_id, order) : null;
  };

  const isMobile = useMediaQuery("(max-width:480px)");

  return {
    appState,
    openModal,
    dispatchAppState,
    footerItems,
    handleOnUpDateFooterIcon,
    handleOnDeleteFooterItem,
    isMobile,
  };
};

type Props = ReturnType<typeof useFooterProps>

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
    },
    GridContainer: {
      overflowY: "hidden",
      overflowX: "scroll",
    },
    itemIsDraft: {
      height: "100%",
      border: "3px solid red",
    },
    gridItem: {
      height: "100%",
      position: "relative",
    },
    editButtonsBox: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      zIndex: 100,
    },
    isSettingIconAndText: {
      margin: "0 20px"
    }
  })
);

export const FooterPresenter:React.FC<Props> = (props) => {
  const classes = useStyles();

  const displayFooterItems = props.footerItems.map((value, index) => {
    // 通常画面で下書き記事は表示させない
    if (props.appState.isSetting === false && value.is_published == false) {
      return null;
    }

    return (
      <Grid
        item
        key={index}
        // 投稿済みか下書きかで見た目を変える
        className={`${classes.gridItem}
            ${value.is_published == true ? null : classes.itemIsDraft}
          `}
      >
        {/* セッティング画面で順番を入れ替えるボタンなどを表示 */}
        {props.appState.isSetting ? (
          <EditButtonsBox className={classes.editButtonsBox}>
            <SwitchOrderButton
              params={{
                footer_item_id: value.footer_item_id,
                order: value.order,
              }}
            />
            <UpdateButton
              onClick={() =>
                props.handleOnUpDateFooterIcon(value.footer_item_id)
              }
            />
            <DeleteButton
              onClick={() =>
                props.handleOnDeleteFooterItem(
                  value.footer_item_id,
                  value.order
                )
              }
            />
          </EditButtonsBox>
        ) : null}

        {/* on_tapが'modal'でモーダルウィンドウオープン。'link'でリンク埋め込み */}
        {value.on_tap === "modal" ? (
          <IconAndText
            className={
              props.appState.isSetting ? classes.isSettingIconAndText : null
            }
            icon={
              value.displayed_icon_name
                ? IconsSetting.convertIconComponentFromName(
                    value.displayed_icon_name
                  )[0]
                : MoodBad
            }
            onClick={() => props.openModal(value.item_content)}
            // fontSize="large"
            text={value.icon_name}
          />
        ) : (
          // "modal"以外→"link"か"appLink"の時
          <a
            href={value.on_tap === "link" ? value.link_url : value.app_link_url}
          >
            <IconAndText
              className={
                props.appState.isSetting ? classes.isSettingIconAndText : null
              }
              icon={
                value.displayed_icon_name
                  ? IconsSetting.convertIconComponentFromName(
                      value.displayed_icon_name
                    )[0]
                  : MoodBad
              }
              // fontSize="large"
              text={value.icon_name}
            />
          </a>
        )}
      </Grid>
    );
  });

  const noItems = <Grid item >No items</Grid>;

  return (
    <div className={classes.root}>
      {props.children}
      <Grid container
      justify={props.footerItems.length > 5 || props.isMobile ? "space-between" : "space-evenly" }
      wrap='nowrap' spacing={2} className={classes.GridContainer}>
        {(props.footerItems.length)? displayFooterItems : noItems}       
      </Grid>            
    </div>
  )

};

export const Footer = () => {
  const props = useFooterProps()
  return (
    <FooterPresenter {...props}>
      <PPagination />
    </FooterPresenter>
  );
}
