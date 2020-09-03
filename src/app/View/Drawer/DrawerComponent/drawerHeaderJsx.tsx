import {
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Button,
  TextField,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import {
  NoteAddOutlined,
  VideoLabel,
  Settings,
  ExitToApp,
  Feedback,
  Wallpaper,
  Instagram,
} from "@material-ui/icons";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { TagsButton } from "../../Footer/PaginationBar/TagsButton";
import { TUseDrawerProps } from "../Drawer";

export const drawerHeaderJsx = (props: TUseDrawerProps) => {
  // Open 開いてパスワード入力画面
  if (!props.appState.isSetting) {
    return (
      <IconButton onClick={props.handleDrawerClose}>
        {props.theme.direction === "ltr" ? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        )}
      </IconButton>
    );
  } 
  // Open isSetting 開いて編集モード
  else if (props.appState.isSetting) {
    return (
      <Button variant="text" onClick={props.handleDrawerClose}>
        {props.isMobile ? null : (
          <Typography variant="body1">観覧モードに切り替え</Typography>
        )}

        {props.theme.direction === "ltr" ? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        )}
      </Button>
    );
  } 
}