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
import { TUseDrawerProps } from "../view/Drawer";
import { IconsSetting } from "../../FooterItemEditor/components/iconSelect/icons";
import { EditButtonsBox } from "../../../../../pureComponents/buttons/EditButtonsBox";
import { FooterItem } from "../../../../../Store/Types";
import { showDataType } from "../../../Main/components/showDataType";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    listItem: {
      display: "flex",
    },
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
      position: "absolute",
      right: theme.spacing(1),
      zIndex: 10,
    },
  });
});

export const drawerItemsJsx = (props: TUseDrawerProps) => {
  const classes = useStyles(props.themes);

  let displayItem = props.footerItems;
  // タブレットビューではon_sidebarのみDrawerに表示させる
  if (props.isMobile === false) {
    displayItem = props.footerItems.filter((value) => {
      // return value.on_sidebar === true
      return value.order_sidebar !== 0;
    });
  }

  const ShowStatus = (value: FooterItem) => {
    return (
      <>
        <Typography variant="body1" component="span">
          {value.is_published === false ? (
            // <span className={classes.itemIsDraft}>下書き</span>
            <Chip size="small" label="下書き" className={classes.itemIsDraft} />
          ) : null}
          {value.on_tap === "appLink" ? (
            // <span className={classes.itemIsAppLink}>アプリ</span>
            <Chip
              size="small"
              label="アプリ"
              className={classes.itemIsAppLink}
            />
          ) : null}
        </Typography>
      </>
    );
  };
  type TItemEditButtonsBox = { value: FooterItem; smallerValue: FooterItem };
  const ItemEditButtonsBox = ({ value, smallerValue }: TItemEditButtonsBox) => (
    <>
      {/* <br /> */}
      <EditButtonsBox
        className={classes.editButtonsBox}
        switch
        switchProps={{ smaller: smallerValue, larger: value }}
        update
        updateProps={{ onClick: props.handleOnUpDateFooterIcon, value: value }}
        delete
        deleteProps={{
          onClick: props.deleteFooterItem,
          value: { footer_item_id: value.footer_item_id, order: value.order },
        }}
      />
    </>
  );

  // order_sidebarの順に並べ替える
  const compareFunc = (a: FooterItem, b: FooterItem) => {
    // Use toUpperCase() to ignore character casing
    const aOrderSidebar = a.order_sidebar;
    const bOrderSidebar = b.order_sidebar;

    return aOrderSidebar - bOrderSidebar;
  };
  displayItem.sort(compareFunc);

  return (
    <List>
      {displayItem.map((value, index, footerItem) => {
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

        if (value.on_tap === "modal" || value.on_tap === "google") {
          return (
            <div key={index} className={classes.listItem}>
              <ListItem
                // key={index}
                button
                onClick={() =>
                  props.openFooterItemModal(value)
                }
              >
                <ListItemIcon>
                  <Icon />
                  <ShowStatus {...value} />
                  {showDataType(value.data_type, "", true)}
                </ListItemIcon>
                <ListItemText
                  primary={value.icon_name}
                  className={classes.listItemText}
                />
              </ListItem>
              {props.isSetting ? (
                <ItemEditButtonsBox
                  value={value}
                  smallerValue={footerItem[index - 1]}
                />
              ) : null}
            </div>
          );
        }

        if (
          value.on_tap === "link" ||
          (value.on_tap === "appLink" && props.isSetting === true)
        ) {
          return (
            <div key={index} className={classes.listItem}>
              <ListItem button>
                <a
                  href={
                    value.on_tap === "link"
                      ? value.link_url
                      : value.app_link_url
                  }
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ListItemIcon>
                    <Icon />
                    <ShowStatus {...value} />
                    {showDataType(value.data_type, "", true)}
                  </ListItemIcon>
                  <ListItemText primary={value.icon_name} />
                </a>
              </ListItem>
              {props.isSetting ? (
                <ItemEditButtonsBox
                  value={value}
                  smallerValue={footerItem[index - 1]}
                />
              ) : null}
            </div>
          );
        }
      })}
    </List>
  );
};
