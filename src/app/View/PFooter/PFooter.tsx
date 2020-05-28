import React, { useContext } from "react";
import { Grid, makeStyles, createStyles } from "@material-ui/core";
import { MoodBad } from "@material-ui/icons";
import { Store, T_footer_item_id, T_order } from "../../Store/Store";
import { IconAndText } from "./IconAndText";
import { PPagination } from './Pagination/PPagination';
import { UpdateArticleButton } from "../buttons/UpdateArticleButton";
import { DeleteArticleButton } from "../buttons/DeleteArticleButton";
import { SwitchOrderButton } from "../buttons/SwitchOrderButton";
import { useGetFooterItem } from "../../ActionCreator/footerItems/useGetFooterItem";
import { useDeleteFooterItem } from "../../ActionCreator/footerItems/useDeleteFooterItem";
import { EditorContext } from "../../Store/EditorContext";
import { IconsSetting } from "../Setting/iconSelect/icons";

export const usePFooterProps = () => {
  const { appState, dispatchAppState, footerItems } = useContext(Store);
  // modalNameをもとにPModalで分岐してどのモーダルウィンドウを表示させるか決める

  const openModal = (item_content: string) => {
    dispatchAppState({ type: "SET_CONTENT", payload: item_content });
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

  return {
    appState,
    openModal,
    dispatchAppState,
    footerItems,
    handleOnUpDateFooterIcon,
    handleOnDeleteFooterItem,
  };
};

type Props = ReturnType<typeof usePFooterProps>

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

export const PFooterPresenter = (props:Props) => {
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
        {/* セッティング画面で順番を入れ替えるボタンを表示 */}
        {props.appState.isSetting && index !== 0 ? (
          <SwitchOrderButton
            position={classes.switchOrderButton}
            params={{
              footer_item_id: value.footer_item_id,
              order: value.order,
            }}
          />
        ) : null}
        {props.appState.isSetting ? (
          <UpdateArticleButton
            position={classes.updateArticleButton}
            // id={value.footer_item_id}
            // handleOnClick={handleOnUpDateFooterIcon}
            onClick={() => props.handleOnUpDateFooterIcon(value.footer_item_id)}
          />
        ) : null}
        {props.appState.isSetting ? (
          <DeleteArticleButton
            position={classes.deleteArticleButton}
            // id={value.footer_item_id}
            // handleOnClick={handleOnDeleteFooterItem}
            onClick={() =>
              props.handleOnDeleteFooterItem(value.footer_item_id, value.order)
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
            onClick={() => props.openModal(value.item_content)}
            fontSize="large"
            text={value.icon_name}
          />
        ) : (
          // "modal"以外→"link"か"appLink"の時
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
  });

  const noItems = <Grid item >No items</Grid>;

  return (
    <div className={classes.root}>
      <PPagination/>
      <Grid container
      justify={props.footerItems.length > 5 ? "space-between" : "space-evenly"}
      wrap='nowrap' spacing={2} className={classes.GridContainer}>
        {(props.footerItems.length)? displayFooterItems : noItems}       
      </Grid>            
    </div>
  )

};

export const PFooter = () => {
  const props = usePFooterProps()
  return <PFooterPresenter {...props}/>
}
