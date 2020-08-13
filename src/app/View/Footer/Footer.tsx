import React, { useContext } from "react";
import { Grid, makeStyles, createStyles, useMediaQuery } from "@material-ui/core";
import { MoodBad } from "@material-ui/icons";
import { Store } from "../../Store/Store";
import { T_footer_item_id, T_order, FooterItem, T_modal_size } from "../../Store/Types";
import { IconAndText } from "./IconAndText";
import { PPagination } from './PaginationBar/PPagination';
import { UpdateButton } from "../viewComponents/buttons/UpdateButton";
import { DeleteButton } from "../viewComponents/buttons/DeleteButton";
import { SwitchOrderButton } from "../viewComponents/buttons/SwitchOrderButton";
import { useDeleteFooterItem } from "../../ActionCreator/footerItems/useDeleteFooterItem";
import { IconsSetting } from "../Drawer/ItemEditor/iconSelect/icons";
import { EditButtonsBox } from "../viewComponents/buttons/EditButtonsBox";
// import { useCalcFooterPadding } from "./useCalcFooterPadding";

export const useFooterProps = () => {
  const { appState, dispatchAppState } = useContext(Store);
  const {footerItems} = appState

  const deleteFooterItem = useDeleteFooterItem();

  const handleOnUpDateFooterIcon = (
    footerItem: FooterItem
  ) => {
    dispatchAppState({
      type: "OPEN_FOOTER_ITEM_EDITOR_FOR_EDIT",
      payload: footerItem,
    });
    dispatchAppState({
      type: "OPEN_MODAL",
      payload: "edit_footer_item",
    });
  };

  const isMobile = useMediaQuery("(max-width:480px)");

  return {
    appState,
    // openModal,
    dispatchAppState,
    footerItems,
    handleOnUpDateFooterIcon,
    deleteFooterItem,
    isMobile,
  };
};

type Props = ReturnType<typeof useFooterProps>

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      // justifyContent: "center",
      alignItems: "center",
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
      margin: "auto",
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
              footer_item_id={value.footer_item_id}
              order={value.order}
            />
            <UpdateButton
              onClick={props.handleOnUpDateFooterIcon}
              value={value}
            />
            <DeleteButton
              onClick={props.deleteFooterItem}
              value={{footer_item_id: value.footer_item_id, order: value.order}}
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
            onClick={() =>
              props.dispatchAppState({
                type: "OPEN_FOOTER_ITEM_MODAL",
                payload: index,
              })
            }
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
      <Grid
        container
        alignItems="center"
        wrap="nowrap"
        spacing={2}
        className={classes.GridContainer}
      >
        {props.footerItems.length ? displayFooterItems : noItems}
      </Grid>
    </div>
  );

};

export const Footer = () => {
  const props = useFooterProps()
  return (
    <FooterPresenter {...props}>
      <PPagination />
    </FooterPresenter>
  );
}
