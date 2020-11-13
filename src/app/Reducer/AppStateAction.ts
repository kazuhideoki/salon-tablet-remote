import {
  TArticle,
  FooterItem,
  T_modal_size,
  TSetModal,
  T_instagram_username,
  T_instagram_id,
  FooterItems,
  T_footer_item_id,
  T_order,
  TTags,
  TInstagramAccounts,
  TInstagramMedias,
  T_on_tap,
  TInfoBarData,
  T_selected_device,
  T_show_article_type,
  T_theme_color,
  T_theme_font,
  T_footer_icon_size,
} from "../Store/Types";
import { T_articles_get_return } from "../../pages/api/articles/get";
import { T_user_info_columns_without_password } from "../../pages/api/user_info/update";
import { T_user_info_switch_generate_public_page_return } from "../../pages/api/user_info/switch_generate_public_page";
import { TThemeParams } from "../Store/ThemeContext";
import { TCreateFooterItem, TFooterItemEdittingParams } from "../ActionCreator/footerItems/useCreateFooterItem";

export type AppStateAction =
  | { type: "SELECT_DEVICE"; payload: T_selected_device }
  | { type: "OPEN_MODAL"; payload: TSetModal }
  | { type: "CLOSE_MODAL" }
  | { type: "OPEN_DRAWER" }
  // セットで利用するが、時間差で作動させる必要があるので別に分けてある
  | { type: "CLOSE_DRAWER" }
  | { type: "ON_IS_LOADING_MAIN" }
  | { type: "OFF_IS_LOADING_MAIN" }
  | { type: "ON_IS_LOADING_FOOTER" }
  | { type: "OFF_IS_LOADING_FOOTER" }
  | { type: "ON_IS_LOADING_TAGS" }
  | { type: "OFF_IS_LOADING_TAGS" }
  | { type: "ON_IS_LOADING_INSTAGRAM_ACCOUNTS" }
  | { type: "OFF_IS_LOADING_INSTAGRAM_ACCOUNTS" }

  // modalウィンドウを開く時
  | { type: "OPEN_ARTICLE_MODAL"; payload: number }
  | { type: "OPEN_ARTICLE_MODAL_FROM_INFO_BAR"; payload: TArticle }
  | {
      type: "OPEN_FOOTER_ITEM_MODAL"; //on_tapの 'modal' と 'google'両方に対応
      payload: T_footer_item_id;
    }
  | { type: "OPEN_INSTAGRAM_MEDIA_MODAL"; payload: number }

  // editor modalウィンドウを開く時. 新規と編集
  | { type: "OPEN_ARTICLE_EDITOR" }
  | { type: "OPEN_FOOTER_ITEM_EDITOR" }
  | { type: "OPEN_ARTICLE_EDITOR_FOR_EDIT"; payload: TArticle }
  | { type: "OPEN_FOOTER_ITEM_EDITOR_FOR_EDIT"; payload: FooterItem }
  // | { type: "SET_MODAL_SIZE"; payload: TCreateFooterItem }
  | { type: "SET_MODAL_SIZE"; payload: TFooterItemEdittingParams }
  | { type: "SET_ON_TAP"; payload: T_on_tap }
  | {
      type: "SET_USER_INFO";
      payload: T_user_info_columns_without_password;
    }
  | {
      type: "SET_THEME";
      payload: {
        themeParams: TThemeParams;
      };
    }
  | {
      type: "SET_THEME_COLOR";
      payload: {
        themeColor: T_theme_color;
      };
    }
  | {
      type: "SET_THEME_FONT1";
      payload: {
        themeFont: T_theme_font;
      };
    }
  | {
      type: "SET_THEME_FONT2";
      payload: {
        themeFont: T_theme_font;
      };
    }
  | {
      type: "SET_THEME_FONT_HEADING";
      payload: {
        themeFont: T_theme_font;
      };
    }
  | {
      type: "SET_FOOTER_ICON_SIZE";
      payload: {
        footerIconSize: T_footer_icon_size;
      };
    }
  | {
      type: "SET_SHOW_ARTICLE_TYPE";
      payload: {
        showArticleType: T_show_article_type;
      };
    }
  | {
      type: "SET_IS_GENERATE_PUBLIC_PAGE";
      payload: T_user_info_switch_generate_public_page_return;
    }
  | {
      type: "SET_ARTICLES";
      payload: {
        data: T_articles_get_return;
        selectedArticlesTags: number[];
        isSetting: boolean;
        showArticles: boolean;
      };
    }
  | { type: "SET_FOOTER_ITEMS"; payload: FooterItems }
  | {
      type: "DELETE_FOOTER_ITEM";
      payload: { footer_item_id: T_footer_item_id; order: T_order };
    }
  | { type: "SET_INFO_BAR"; payload: TInfoBarData }
  | { type: "SET_TAGS"; payload: TTags }
  | { type: "SET_INSTAGRAM_ACCOUNTS"; payload: TInstagramAccounts }
  | {
      type: "SET_INSTAGRAM_MEDIAS";
      payload: {
        data: TInstagramMedias;
        selectedInstagramAccount: {
          id: T_instagram_id;
          username: T_instagram_username;
        };
      };
    }
  | { type: "DELETE_INSTAGRAM_MEDIAS" }
