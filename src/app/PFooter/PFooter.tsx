import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { MoodBad } from "@material-ui/icons";
import { Store } from "../Store/Store";
import { IconAndText } from "./IconAndText";
import { useStylesFactory } from "../Store/useStylesFactory";
import { PPagination } from './Pagination/PPagination';
import { UpdatePostButton } from "../Setting/buttons/UpdatePostButton";
import { DeletePostButton } from "../Setting/buttons/DeletePostButton";
import { SwitchOrderButton } from "../Setting/buttons/SwitchOrderButton";
import { useGetFooterItem, useDeleteFooterItem } from "../Store/footerItems/footerItemsActionCreator";
import { EditorContext } from "../Store/EditorContext";
import { IconsSetting } from "../Setting/iconSelect/icons";


const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
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
};

export type HandleOnUpDateFooterIcon = (params: any) => void;

export const PFooter = () => {
    const classes = useStylesFactory(styles);
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

    const handleOnUpDateFooterIcon: HandleOnUpDateFooterIcon = (params) => {
      dispatchAppState({ type: "OPEN_MODAL", payload: "edit_footer_item" });
      setIsEdittingFooterItem(true);
      getFooterItem(params);
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
    let displayFooterItems;

    if (footerItems) {
      displayFooterItems = footerItems.map((value, index) => {

        // 通常画面で下書き記事は表示させない
        if (appState.isSetting === false && value.is_published == false) {
          return null;
        }
        
        // セッティング画面で順番を入れ替えるボタンを表示
        
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
            {appState.isSetting && index !== 0 ?
              <SwitchOrderButton
                position={classes.switchOrderButton}
                params={{footer_item_id: value.footer_item_id, order: value.order,}}
              />
              : null}
            {appState.isSetting ? (
              <UpdatePostButton
                position={classes.updatePostButton}
                params={value}
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
            {value.on_tap_modal_open ? null : <a href={value.link_url} />}
            <IconAndText
              icon={
                value.displayed_icon
                  ? IconsSetting.convertIconComponentFromName(
                      value.displayed_icon
                    )[0]
                  : MoodBad
              }
              onClick={
                value.on_tap_modal_open
                  ? () => openModal("footer_item", value.item_content)
                  : null
              }
              fontSize="large"
              text={value.icon_name}
            />
            {value.on_tap_modal_open ? null : <a />}
          </Grid>
        );
        
      })

    }else{
      displayFooterItems = <>No items</>
    }

    return (
      <div className={classes.root}>
        <PPagination/>
        <Grid container justify="center" spacing={2}
        // className={classes.gridContainer}
        >
          {displayFooterItems}
          {/* ↓表示テスト */}
          {/* <Grid item className={classes.gridItem}>
            <IconAndText
              icon={ImportContactsTwoTone}
              fontSize="large"
              text={"アイコン"}
            />
          </Grid> */}
        </Grid>            
      </div>
    )

  };

  return PFooterPresenter(props);
};
