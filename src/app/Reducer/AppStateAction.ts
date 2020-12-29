import {
  TArticle,
  FooterItem,
  TSetModal,
  T_instagram_username,
  T_instagram_id,
  FooterItems,
  T_footer_item_id,
  T_order,
  T_on_tap,
  T_selected_device,
  T_show_article_type,
  T_theme_color,
  T_theme_font,
  T_footer_icon_size,
  TInstagramMedia,
} from "../Store/Types";
import { T_articles_get_return } from "../../pages/api/articles/get";
import { T_user_info_switch_generate_public_page_return } from "../../pages/api/user_info/switch_generate_public_page";
import { TThemeParams } from "../Store/ThemeContext";
import { TFooterItemEdittingParams } from "../ActionCreator/footerItems/useCreateFooterItem";
import { T_user_info_update } from "../../pages/api/user_info/update";

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
  | { type: "OPEN_ARTICLE_MODAL"; payload: { num: number; article: TArticle } }
  | { type: "OPEN_ARTICLE_MODAL_FROM_INFO_BAR"; payload: TArticle }
  | {
      type: "OPEN_FOOTER_ITEM_MODAL"; //on_tapの 'modal' と 'google'両方に対応
      payload: { footerItemId: T_footer_item_id; footerItems: FooterItems };
    }
  | { type: "OPEN_INSTAGRAM_MEDIA_MODAL"; payload: TInstagramMedia }

  // editor modalウィンドウを開く時. 新規と編集
  | { type: "OPEN_ARTICLE_EDITOR" }
  | { type: "OPEN_FOOTER_ITEM_EDITOR" }
  | { type: "OPEN_ARTICLE_EDITOR_FOR_EDIT"; payload: TArticle }
  | { type: "OPEN_FOOTER_ITEM_EDITOR_FOR_EDIT"; payload: FooterItem }
  | {
      type: "SET_MODAL_SIZE";
      payload: {
        footerItemEdittingParams: TFooterItemEdittingParams;
        footerItems: FooterItems;
      };
    }
  | { type: "SET_ON_TAP"; payload: T_on_tap }
  | {
      type: "SET_USER_INFO"
      // payload: T_user_info_update;
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
      payload: { footer_item_id: T_footer_item_id; order: T_order};
    }
  // | { type: "SET_INFO_BAR"; payload: TInfoBarData }
  | { type: "SET_TAGS" }
  | { type: "SET_INSTAGRAM_ACCOUNTS" }
  // | {
  //     type: "SET_INSTAGRAM_RECONNECT_NEEDED";
  //     payload: T_instagram_accounts_reconnect_needed;
  //   }
  | {
      type: "SET_INSTAGRAM_MEDIAS";
      payload: {
        selectedInstagramAccount: {
          id: T_instagram_id;
          username: T_instagram_username;
        };
      };
    }
  | { type: "DELETE_INSTAGRAM_MEDIAS" };
