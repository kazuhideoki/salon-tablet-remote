import React, { useContext } from "react";
import { Grid, makeStyles, createStyles } from "@material-ui/core";
import { MoodBad } from "@material-ui/icons";
import { Store, T_footer_item_id, T_order } from "../../Store/Store";
import { IconAndText } from "./IconAndText";
import { PPagination } from './Pagination/PPagination';
import { UpdateArticleButton } from "../Setting/buttons/UpdateArticleButton";
import { DeleteArticleButton } from "../Setting/buttons/DeleteArticleButton";
import { SwitchOrderButton } from "../Setting/buttons/SwitchOrderButton";
import { useGetFooterItem } from "../../ActionCreator/footerItems/useGetFooterItem";
import { useDeleteFooterItem } from "../../ActionCreator/footerItems/useDeleteFooterItem";
import { EditorContext } from "../../Store/EditorContext";
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
    // itemIsPublished: {
    //   // position: "relative",
    //   height: "100%",
    // },
    itemIsDraft: {
      // position: "relative",
      height: "100%",
      border: "3px solid red",
    },
    gridItem: {
      height: "100%",
      position: "relative",
    },
    deleteArticleButton: {
      position: "absolute",
      top: 0,
      right: 5,
      zIndex: 100,
    },
    updateArticleButton: {
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
  })
);

// export type HandleOnUpDateFooterIcon = (params: any) => void;

export const PFooter = () => {
    const classes = useStyles();
    const { appState, dispatchAppState, footerItems } = useContext(Store);
  // modalNameをもとにPModalで分岐してどのモーダルウィンドウを表示させるか決める
    const openModal = (modalName: string, footerItemContentModal: any) => {
        dispatchAppState({ type: "OPEN_MODAL", payload: modalName });
      dispatchAppState({ type: "SET_FOOTER_ITEM_CONTENT", payload: footerItemContentModal})
      }

    const { setIsEdittingFooterItem } = React.useContext(
      EditorContext
    );
    const getFooterItem = useGetFooterItem();
    const deleteFooterItem = useDeleteFooterItem();


    const handleOnUpDateFooterIcon = (
      footer_item_id: T_footer_item_id
    ) => {
      dispatchAppState({ type: "OPEN_MODAL", payload: "edit_footer_item" });
      setIsEdittingFooterItem(true);
      getFooterItem(footer_item_id);
    };
    const handleOnDeleteFooterItem = (footer_item_id: T_footer_item_id, order: T_order) => {
      const deleting = confirm("本当に削除してよろしいですか？");
      deleting ? deleteFooterItem(footer_item_id, order) : null;
    };


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
            className={`${classes.gridItem}
              ${value.is_published == true ? null : classes.itemIsDraft}
            `}
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
              <UpdateArticleButton
                position={classes.updateArticleButton}
                // id={value.footer_item_id}
                // handleOnClick={handleOnUpDateFooterIcon}
                onClick={() => handleOnUpDateFooterIcon(value.footer_item_id)}
              />
            ) : null}
            {appState.isSetting ? (
              <DeleteArticleButton
                position={classes.deleteArticleButton}
                // id={value.footer_item_id}
                // handleOnClick={handleOnDeleteFooterItem}
                onClick={() =>
                  handleOnDeleteFooterItem(value.footer_item_id, value.order)
                }
              />
            ) : null}
            {/* on_tapが'modal'でモーダルウィンドウオープン。'link'でリンク埋め込み */}
            {value.on_tap === "modal" ? (
              <IconAndText
                icon={
                  value.displayed_icon_name
                    ? IconsSetting.convertIconComponentFromName(
                        value.displayed_icon_name
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
                    value.displayed_icon_name
                      ? IconsSetting.convertIconComponentFromName(
                          value.displayed_icon_name
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
        <Grid container
        justify={footerItems.length > 5 ? "space-between" : "space-evenly"}
        wrap='nowrap' spacing={2} className={classes.GridContainer}>
          {(footerItems.length)? displayFooterItems : noItems}       
        </Grid>            
      </div>
    )

  };

  return PFooterPresenter(props);
};
