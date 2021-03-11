import React from 'react';
import { Grid, makeStyles, createStyles } from '@material-ui/core';
import { IconAndText } from './components/IconAndText';
import { IconsSetting } from '../../Drawer/FooterItemEditor/components/iconSelect/icons';
import { EditButtonsBox } from '../../../../components/editButtonBox/EditButtonsBox';
import { showDataType } from '../../Main/components/showDataType';
import { useIsMobile } from '../../../../../util/useIsMobile';
import { useDeleteFooterItem } from '../../../../hooks/footerItems/useDeleteFooterItem';
import { useStateFooter } from './context/useStateFooter';
import { useHandleOnUpdateFooterItem } from './context/useHandleOnUpdateFooterItem';
import { useHandleLoadingFooter } from './context/useHandleLoadingFooter';
import { useOpenFooterItemModal } from './context/useOpenFooterItemModal';
import { useSwitchOrder } from '../../../../hooks/footerItems/useSwitchOrder';
import { FooterPresenterProps, useFooterProps } from './useFooterProps';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
    },
    GridContainer: {
      overflowY: 'hidden',
      overflowX: 'scroll',
    },
    itemIsDraft: {
      height: '100%',
      border: '3px solid red',
    },
    gridItem: {
      margin: 'auto',
      height: '100%',
      position: 'relative',
    },
    editButtonsBox: {
      position: 'absolute',
      top: theme.spacing(1),
      right: 0,
      // left: 0,
      justifyContent: 'center',
      zIndex: 100,
      left: 'auto',
    },
    showDataType: {
      position: 'absolute',
      top: 48,
      left: 0,
    },
    isSettingIconAndText: {
      margin: '0 20px',
    },
  })
);

export const FooterPresenter: React.FC<FooterPresenterProps> = (props) => {
  const classes = useStyles();

  const selectedDisplayFooterItems = props.footerItems.filter((value) => {
    return value.order_sidebar === 0;
  });

  const displayFooterItems = selectedDisplayFooterItems.map(
    (value, index, footerItem) => {
      // 通常画面で下書き記事は表示させない
      if (props.isSetting === false && value.is_published == false) {
        return null;
      }
      // on_sidebarの場合はDrawerに表示させるため
      if (value.order_sidebar !== 0) {
        return null;
      }

      return (
        <Grid
          item
          key={index}
          // 投稿済みか下書きかで見た目を変える
          className={`${classes.gridItem}
            ${value.is_published == true ? null : classes.itemIsDraft}
          `}>
          {props.isSetting ? (
            <EditButtonsBox
              className={classes.editButtonsBox}
              handleSwitchButton={{
                smaller: footerItem[index - 1],
                switchOrder: () =>
                  props.switchOrder({
                    smaller: footerItem[index - 1],
                    larger: value,
                  }),
              }}
              handleUpdateButton={{
                onClick: () => props.handleOnUpDateFooterIcon(value),
              }}
              handleDeleteButton={{
                onClick: () =>
                  props.deleteFooterItem({
                    footer_item_id: value.footer_item_id,
                    order: value.order,
                  }),
              }}
            />
          ) : null}

          {showDataType(value.data_type, classes.showDataType)}

          {/* on_tapが'modal'でモーダルウィンドウオープン。'link'でリンク埋め込み */}
          {value.on_tap === 'modal' || value.on_tap === 'google' ? (
            <IconAndText
              className={
                props.isSetting ? classes.isSettingIconAndText : undefined
              }
              icon={
                IconsSetting.convertIconComponentFromName(
                  value.displayed_icon_name
                )[0]
              }
              onClick={() => props.openFooterItemModal(value)}
              text={value.icon_name}
              loading={props.loading}
            />
          ) : (
            // "modal", 'google'以外→"link"か"appLink"の時
            <a
              href={
                value.on_tap === 'link' ? value.link_url : value.app_link_url
              }
              rel="noopener noreferrer"
              target="_blank">
              <IconAndText
                className={
                  props.isSetting ? classes.isSettingIconAndText : undefined
                }
                icon={
                  IconsSetting.convertIconComponentFromName(
                    value.displayed_icon_name
                  )[0]
                }
                text={value.icon_name}
                loading={props.loading}
              />
            </a>
          )}
        </Grid>
      );
    }
  );

  const noItems = <Grid item>No items</Grid>;

  return (
    <div className={classes.root}>
      <Grid
        container
        alignItems="center"
        wrap="nowrap"
        spacing={2}
        className={classes.GridContainer}>
        {props.footerItems.length ? displayFooterItems : noItems}
      </Grid>
    </div>
  );
};

export const Footer = () => {
  const props = useFooterProps();
  return (
    <>
      <FooterPresenter {...props} />
    </>
  );
};
