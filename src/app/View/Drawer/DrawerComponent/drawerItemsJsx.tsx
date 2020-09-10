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
  Typography,
} from "@material-ui/core";
import { MoodBad } from "@material-ui/icons";
import { TUseDrawerProps } from "../Drawer";
import { IconsSetting } from "../ItemEditor/iconSelect/icons";
import { TThemeArgs } from "../../../Store/ThemeContext";
import { EditButtonsBox } from "../../viewComponents/buttons/EditButtonsBox";
import { UpdateButton } from "../../viewComponents/buttons/UpdateButton";
import { DeleteButton } from "../../viewComponents/buttons/DeleteButton";
import { FooterItem } from "../../../Store/Types";

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
      listItemText: {
        textOverflow: "ellipsis",
      },
      itemIsDraft: {
        border: "2px solid red",
        borderRadius: 2,
        fontStyle: "italic",
      },
      itemIsAppLink: {
        border: "2px solid green",
        borderRadius: 2,
        fontStyle: "italic",
      }, 
      editButtonsBox: {
        width: "fit-content",
        marginLeft: "auto",
      },
    });
})

export const drawerItemsJsx = (props: TUseDrawerProps) => {

  const classes = useStyles(props.themes)

  const ShowStatus = (value: FooterItem) => {
    
    return (
      <Typography variant="body1" component="span">
        {value.is_published === false ? (
          // <span className={classes.itemIsDraft}>下書き</span>
          <Chip size="small" label="下書き" className={classes.itemIsDraft} />
        ) : null}
        {value.on_tap === "appLink" ? (
          // <span className={classes.itemIsAppLink}>アプリ</span>
          <Chip size="small" label="アプリ" className={classes.itemIsAppLink} />
        ) : null}
      </Typography>
    );

  }

  const ItemEditButtonsBox = (value: FooterItem) => (
    <>
      <br />
      <EditButtonsBox className={classes.editButtonsBox}>
        <UpdateButton onClick={props.handleOnUpDateFooterIcon} value={value} />
        <DeleteButton onClick={props.deleteItem} value={value.footer_item_id} />
      </EditButtonsBox>
    </>
  );

  return (
    <List>
      {props.footerItems.map((value, index) => {
        if (props.isSetting === false && value.is_published == false) {
          return null;
        }

        if (props.isSetting === false && value.on_tap === "appLink") {
          return null;
        }
        

        const ItemIcon = value.displayed_icon_name
          ? IconsSetting.convertIconComponentFromName(
              value.displayed_icon_name
            )[0]
          : MoodBad;

        const Icon = () => <ItemIcon />;

        if (value.on_tap === "modal") {
          return (
            <div key={index}>
              <ListItem
                // key={index}
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
                  <ShowStatus {...value} />
                </ListItemIcon>
                <ListItemText
                  primary={value.icon_name}
                  className={classes.listItemText}
                />
              </ListItem>
              {props.isSetting ? <ItemEditButtonsBox {...value} /> : null}
            </div>
          );
        }

        if (
          value.on_tap === "link" ||
          (value.on_tap === "appLink" && props.isSetting === true)
        ) {
          return (
            <ListItem key={index} button>
              <a
                href={
                  value.on_tap === "link" ? value.link_url : value.app_link_url
                }
              >
                <ListItemIcon>
                  <Icon />
                  <ShowStatus {...value} />
                </ListItemIcon>
                <ListItemText primary={value.icon_name} />
              </a>
              {props.isSetting ? <ItemEditButtonsBox {...value} /> : null}
            </ListItem>
          );
        }

      })}
    </List>
  );

}