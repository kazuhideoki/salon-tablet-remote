import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import {
    ImportContactsTwoTone,
} from "@material-ui/icons";
import { Store } from "../Store/Store";
import { IconAndText } from "./IconAndText";
import { useStylesFactory } from "../Store/useStylesFactory";
import { PPagination } from './Pagination/PPagination';
import { UpdatePostButton } from "../Setting/buttons/UpdatePostButton";
import { DeletePostButton } from "../Setting/buttons/DeletePostButton";
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
  gridContainer: {
    position: "relative",
  },
  gridItem: {
    position: "relative",
  },
  deletePostButton: {
    position: "absolute",
    top: 0,
    right: 50,
    zIndex: 100,
  },
  createPostButton: {
    position: "absolute",
    top: 50,
    left: 100,
    zIndex: 100,
  },
};

export const PFooter = () => {
    const classes = useStylesFactory(styles);
    const { appState, dispatchAppState, footerItems } = useContext(Store);
  // modalNameをもとにPModalで分岐してどのモーダルウィンドウを表示させるか決める
    const openModal = (modalName: string) =>
        dispatchAppState({ type: "OPEN_MODAL", payload: modalName });

    const { setIsEdittingFooterItem } = React.useContext(
      EditorContext
    );
    const getFooterItem = useGetFooterItem();

    const handleOnUpDateFooterIcon = (params) => {
      dispatchAppState({ type: "OPEN_MODAL", payload: "edit_footer_icon" });
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
        
        <Grid item key={index} className={classes.gridItem}>
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
              id={value.footer_items_id}
              handleOnClick={deleteFooterItem}
            />
          ) : null}
          {value.on_tap_modal_open ? null : <a href={value.link_url} />}
          <IconAndText
            icon={IconsSetting.convertIconComponentFromName(value.displayed_icon)}
            onClick={
              value.on_tap_modal_open ? () => openModal("footer_item") : null
            }
            fontSize="large"
            text={value.icon_name}
          />
          {value.on_tap_modal_open ? null : <a />}
        </Grid>;
        
      })

    }else{
      displayFooterItems = 'No items'
    }

    return (
      <div className={classes.root}>
        <PPagination/>
        <Grid container justify="center" spacing={2} className={classes.gridContainer}>
          {displayFooterItems}
        </Grid>            
      </div>
    )

  };

  return PFooterPresenter(props);
};
