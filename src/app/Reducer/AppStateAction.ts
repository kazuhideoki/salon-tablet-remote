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
  TInstagramMedia,
} from "../Store/Types";
import { T_articles_get_return } from "../../pages/api/articles/get";
import { TFooterItemEdittingParams } from "../ActionCreator/footerItems/useCreateFooterItem";

export type AppStateAction =


  // modalウィンドウを開く時
  | {
      type: "OPEN_FOOTER_ITEM_MODAL"; //on_tapの 'modal' と 'google'両方に対応
      payload: { footerItemId: T_footer_item_id; footerItems: FooterItems };
    }

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
