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
  T_user_id,
  T_user_name,
  T_shop_name,
  T_user_email,
  T_selected_theme,
  TInstagramMedias,
} from "../Store/Types";
import { T_articles_get_return } from "../../pages/api/articles/get";
export type AppStateAction =
  | { type: "OPEN_MODAL"; payload: TSetModal }
  | { type: "CLOSE_MODAL" }
  | { type: "OPEN_DRAWER" }

  // セットで利用するが、時間差で作動させる必要があるので別に分けてある
  | { type: "CLOSE_DRAWER" }
  | { type: "ON_IS_LOADING_MAIN" }
  | { type: "OFF_IS_LOADING_MAIN" }

  // modalウィンドウを開く時
  | { type: "OPEN_ARTICLE_MODAL"; payload: number }
  | {
      type: "OPEN_FOOTER_ITEM_MODAL";
      payload: number;
    }
  | { type: "OPEN_INSTAGRAM_MEDIA_MODAL"; payload: number }

  // editor modalウィンドウを開く時. 新規と編集
  | { type: "OPEN_ARTICLE_EDITOR" }
  | { type: "OPEN_FOOTER_ITEM_EDITOR" }
  | { type: "OPEN_ARTICLE_EDITOR_FOR_EDIT"; payload: TArticle }
  | { type: "OPEN_FOOTER_ITEM_EDITOR_FOR_EDIT"; payload: FooterItem }
  | { type: "SET_MODAL_SIZE"; payload: T_modal_size }
  | {
      type: "SET_USER_INFO";
      payload: {
        user_id: T_user_id;
        user_name: T_user_name;
        shop_name: T_shop_name;
        user_email: T_user_email;
      };
    }
  | {
      type: "SET_THEME";
      payload: {
        selectedTheme: T_selected_theme;
      };
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
    };
