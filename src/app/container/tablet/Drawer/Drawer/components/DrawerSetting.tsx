import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Button,
  TextField,
  ListItemText,
} from '@material-ui/core';
import {
  NoteAddOutlined,
  VideoLabel,
  Settings,
  ExitToApp,
  Feedback,
  Wallpaper,
  Instagram,
} from '@material-ui/icons';
import { TagsButton } from '../../../Footer/PaginationBar/components/TagsButton';
import { DrawerPresenterProps } from '../Drawer';

export const DrawerSetting: React.FC<DrawerPresenterProps> = (props) => {
  if (props.isSetting) {
    return (
      <>
        <List>
          <ListItem button onClick={() => props.openArticleEditor()}>
            <ListItemIcon>
              <NoteAddOutlined />
            </ListItemIcon>
            <ListItemText primary="記事作成" />
          </ListItem>
          <ListItem button onClick={() => props.openFooterItemEditor()}>
            <ListItemIcon>
              <VideoLabel />
            </ListItemIcon>
            <ListItemText primary="アイテム作成" />
          </ListItem>
          <ListItem button onClick={() => props.openModal('edit_tags')}>
            <ListItemIcon>
              <TagsButton />
            </ListItemIcon>
            <ListItemText primary="タグ管理" />
          </ListItem>
          <ListItem button onClick={() => props.openModal('manage_instagram')}>
            <ListItemIcon>
              <Instagram />
            </ListItemIcon>
            <ListItemText primary="Instagram 連携" secondary="製作中" />
          </ListItem>
          <ListItem button onClick={() => props.openModal('setting_theme')}>
            <ListItemIcon>
              <Wallpaper />
            </ListItemIcon>
            <ListItemText primary="デザイン" secondary="製作中" />
          </ListItem>
          <ListItem button onClick={() => props.openModal('setting_user_info')}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="アカウント" />
          </ListItem>
          <ListItem button onClick={() => props.openModal('feedback_form')}>
            <ListItemIcon>
              <Feedback />
            </ListItemIcon>
            <ListItemText primary="フィードバック" />
          </ListItem>
          <ListItem button onClick={() => props.handleOnSignOut()}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="サインアウト" />
          </ListItem>
        </List>
      </>
    );
  } else {
    return (
      <List>
        <ListItem button onClick={() => props.handleSwitchIsSetting()}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText secondary="設定（staff only）" />
        </ListItem>
      </List>
    );
  }
};
