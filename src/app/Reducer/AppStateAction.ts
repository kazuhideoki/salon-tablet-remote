import {
  TArticle,
  FooterItem,
  T_instagram_username,
  T_instagram_id,
  FooterItems,
} from "../Store/Types";
import { T_articles_get_return } from "../../pages/api/articles/get";
import { TFooterItemEdittingParams } from "../ActionCreator/footerItems/useCreateFooterItem";

export type AppStateAction =




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
