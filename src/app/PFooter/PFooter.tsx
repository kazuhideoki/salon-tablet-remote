import React, { useContext } from "react";
import { Grid, makeStyles, createStyles } from "@material-ui/core";
import { MoodBad } from "@material-ui/icons";
import { Store } from "../Store/Store";
import { IconAndText } from "./IconAndText";
import { PPagination } from './Pagination/PPagination';
import { UpdatePostButton } from "../Setting/buttons/UpdatePostButton";
import { DeletePostButton } from "../Setting/buttons/DeletePostButton";
import { SwitchOrderButton } from "../Setting/buttons/SwitchOrderButton";
import { useGetFooterItem, useDeleteFooterItem } from "../Store/footerItems/footerItemsActionCreator";
import { EditorContext } from "../Store/EditorContext";
import { IconsSetting } from "../Setting/iconSelect/icons";


const useStyles = makeStyles((theme) =>
  createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  GridContainer: {
    overflow: "scroll",
  },
  itemIsPublished: {
    position: "relative",
    height: "100%",
  },
  itemIsDraft: {
    position: "relative",
    height: "100%",
    border: "3px solid red",
  },
  gridItem: {
    position: "relative",
  },
  deletePostButton: {
    position: "absolute",
    top: 0,
    right: 5,
    zIndex: 100,
  },
  updatePostButton: {
    position: "absolute",
    top: 0,
    right: 35,
    zIndex: 100,
  },
  switchOrderButton: {
    position: "absolute",
    top: 0,
    right: 65,
    zIndex: 100,
  },
}))

export type HandleOnUpDateFooterIcon = (params: any) => void;

export const PFooter = () => {
    const classes = useStyles();
    const { appState, dispatchAppState, footerItems } = useContext(Store);
  // modalNameをもとにPModalで分岐してどのモーダルウィンドウを表示させるか決める
    const openModal = (modalName: string, footerItemContent: any) => {
        dispatchAppState({ type: "OPEN_MODAL", payload: modalName });
      dispatchAppState({ type: "SET_FOOTER_ITEM_CONTENT", payload: footerItemContent})
      }

    const { setIsEdittingFooterItem } = React.useContext(
      EditorContext
    );
    const getFooterItem = useGetFooterItem();

    const handleOnUpDateFooterIcon: HandleOnUpDateFooterIcon = (footer_item_id) => {
      dispatchAppState({ type: "OPEN_MODAL", payload: "edit_footer_item" });
      setIsEdittingFooterItem(true);
      getFooterItem(footer_item_id);
    };

    const deleteFooterItem = useDeleteFooterItem()

    const props = {
      classes,
      openModal,
      dispatchAppState,
      footerItems,
    };
    type Props = typeof props;

  const PFooterPresenter = ({ classes, openModal, dispatchAppState, footerItems }: Props) => {
    const  displayFooterItems = footerItems.map((value, index) => {

        // 通常画面で下書き記事は表示させない
        if (appState.isSetting === false && value.is_published == false) {
          return null;
        }
      
        
        return (
          <Grid
            item
            key={index}
            // 投稿済みか下書きかで見た目を変える
            className={
              value.is_published == true
                ? classes.itemIsPublished
                : classes.itemIsDraft
            }
          >
            {/* セッティング画面で順番を入れ替えるボタンを表示 */}
            {appState.isSetting && index !== 0 ? (
              <SwitchOrderButton
                position={classes.switchOrderButton}
                params={{
                  footer_item_id: value.footer_item_id,
                  order: value.order,
                }}
              />
            ) : null}
            {appState.isSetting ? (
              <UpdatePostButton
                position={classes.updatePostButton}
                id={value.footer_item_id}
                handleOnClick={handleOnUpDateFooterIcon}
              />
            ) : null}
            {appState.isSetting ? (
              <DeletePostButton
                position={classes.deletePostButton}
                id={value.footer_item_id}
                handleOnClick={deleteFooterItem}
              />
            ) : null}
            {/* on_tapが'modal'でモーダルウィンドウオープン。'link'でリンク埋め込み */}
            {value.on_tap === "modal" ? (
              <IconAndText
                icon={
                  value.displayed_icon
                    ? IconsSetting.convertIconComponentFromName(
                        value.displayed_icon
                      )[0]
                    : MoodBad
                }
                onClick={() => openModal("footer_item", value.item_content)}
                fontSize="large"
                text={value.icon_name}
              />
            ) : (
              <a href={value.link_url}>
                <IconAndText
                  icon={
                    value.displayed_icon
                      ? IconsSetting.convertIconComponentFromName(
                          value.displayed_icon
                        )[0]
                      : MoodBad
                  }
                  fontSize="large"
                  text={value.icon_name}
                />
              </a>
            )}
          </Grid>
        );
        
      })

    const noItems = <Grid item >No items</Grid>;

    return (
      <div className={classes.root}>
        <PPagination/>
        <Grid container justify="center" wrap='nowrap' spacing={2} className={classes.GridContainer}>
          {(footerItems.length)? displayFooterItems : noItems}       
        </Grid>            
      </div>
    )

  };

  return PFooterPresenter(props);
};
