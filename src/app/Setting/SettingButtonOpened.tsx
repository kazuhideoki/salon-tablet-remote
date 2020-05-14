import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SpeedDial, { SpeedDialProps } from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { VideoLabel, NoteAddOutlined, Settings, Close } from "@material-ui/icons";
import { Store } from "../Store/Store";
import { EditorContext } from "../Store/EditorContext";
import { useGetPost } from "../Store/articles/articlesActionCreator";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: "absolute",
      "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
        bottom: theme.spacing(4),
        right: theme.spacing(4),
      },
      "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
        top: theme.spacing(4),
        left: theme.spacing(4),
      },
    },
    // Tooltipのラベルの表示を整形
    staticTooltipLabel: {
      width: "max-content",
    },
  })
);

// 上が下に来る
const useActions = () => {
  const { dispatchAppState } = React.useContext(Store)
  const {
    setEditorText,
    setTitleText,
    setFooterItemEditorText,
    setIconName,
    setOnTap,
    setLinkUrl,
    setIsEdittingArticle,
    dispatchSelectedIcon,
    setIsEdittingFooterItem,
  } = React.useContext(EditorContext);

  const handleOpenArticleEditor = () => {
    dispatchAppState({type: "OPEN_MODAL", payload: 'edit_article'})
    setIsEdittingArticle(false)
    setTitleText('')
    setEditorText('')
  }
  
  const handleOpenFooterItemEditor = () => {
    dispatchAppState({type: "OPEN_MODAL", payload: 'edit_footer_item'})
    setIsEdittingFooterItem(false)
    setIconName('')
    setFooterItemEditorText('')
    setOnTap('modal')
    setLinkUrl('')
    dispatchSelectedIcon({ type: "SET_ICON", payload: null });
  }

  return [
  { 
    icon: <VideoLabel onClick={() => handleOpenFooterItemEditor()}/>,
    name: "フッターアイコン追加"
    // name: "New Icon"
  },
  { 
    icon: <NoteAddOutlined onClick={() => handleOpenArticleEditor()} />,
    // name: "新規投稿"
    name: "New Article"
  },
]}

type Props = {
  className?: string
  handleOpen?: () => void
  handleClose?: () => void
}
export const SettingButtonOpened = ({
  className,
  // handleOpen,
  // handleClose
}:Props) => {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const { appState, dispatchAppState, paginationParams } = React.useContext(Store)
  const actions = useActions()
  const getPost = useGetPost()

  const handleClose = async () => {
    await dispatchAppState({ type: "OFF_IS_SETTING" });
    // getPost(1)
  };

  const handleOpen = () => {
    // dispatchAppState({type: "ON_IS_SETTING"});
    // ON_IS_SETTINGのあとなので全記事を読み込む
    // getPost(paginationParams.page)
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial SettingO
      ButtonOpened"
      // propsでSettingButtonと同じものを渡すように
      className={className}
      hidden={hidden}
      // onCloseを除き, SpeedDialIconにonClickをつけることでアイコンをタップしたときのみ戻る。

      // onClose={() => getPost(1)}
      icon={
        <SpeedDialIcon
          icon={<Settings />}
          openIcon={<Close />}
          onClick={() => handleClose()}
        />
      }
      onOpen={() => handleOpen()}
      // onOpen={() => getPost(paginationParams.page)}
      open={appState.isSetting}
      direction={"up"}
    >
      {actions.map((action, index) => (
        <SpeedDialAction
          key={index}
          icon={action.icon}
          tooltipOpen
          tooltipTitle={action.name}
          // TooltipClassesがうまくいかなかったので直接classesにいれた↓
          // TooltipClasses={classes.tooltip}
          classes={{ staticTooltipLabel: classes.staticTooltipLabel }}
        />
      ))}
    </SpeedDial>
  );
}
