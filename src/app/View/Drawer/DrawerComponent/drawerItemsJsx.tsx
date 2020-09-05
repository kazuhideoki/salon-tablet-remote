import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { MoodBad } from "@material-ui/icons";
import { TUseDrawerProps } from "../Drawer";
import { IconsSetting } from "../ItemEditor/iconSelect/icons";
import { TThemeArgs } from "../../../Store/ThemeContext";

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
      chipItemName: {
        position: "absolute",
        left: (themes: TThemeArgs) => themes.drawerWidth,
        // zIndex: 100,
      },
      listItemText: {
        textOverflow: "ellipsis",
      },
    });
})

export const drawerItemsJsx = (props: TUseDrawerProps) => {

  const classes = useStyles(props.themes)

  return (
    <>
      <List>
        {props.footerItems.map((value, index) => {

          if (props.isSetting === false && value.is_published == false) {
            return null;
          }

          if (value.on_tap === 'appLink') {
            return null
          }

          const ItemIcon = value.displayed_icon_name
            ? IconsSetting.convertIconComponentFromName(
                value.displayed_icon_name
              )[0]
            : MoodBad;

          const Icon = () => <ItemIcon/>

          if (value.on_tap === 'modal') {
            return (
              <ListItem
                key={index}
                button
                onClick={() =>
                  props.dispatchAppState({
                    type: "OPEN_FOOTER_ITEM_MODAL",
                    payload: index,
                  })
                }
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                {/* {props.isMobile ? <Chip size='small' label={value.icon_name} className={classes.chipItemName}/> : (
                  <ListItemText primary={value.icon_name} />
                )} */}
                  <ListItemText primary={value.icon_name} className={classes.listItemText}/>
              </ListItem>
            );
          }

          if (value.on_tap === 'link') {
            return (
              <ListItem key={index} button>
                <a href={value.link_url}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  {props.isMobile ? null : (
                    <ListItemText primary={value.icon_name} />
                  )}
                </a>
              </ListItem>
            );
          }

        })}
        
       
      </List>
    </>
  );
}