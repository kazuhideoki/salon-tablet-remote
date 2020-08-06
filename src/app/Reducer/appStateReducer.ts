import { AppState, TArticle, FooterItem, T_modal_size, TSetModal, TInstagramMedia, T_instagram_username, T_instagram_id, TArticles, FooterItems, T_footer_item_id, T_order, TTags, TInstagramAccounts, T_user_id, T_user_name, T_shop_name, T_user_email, T_selected_theme, TInstagramMedias } from '../Store/Types'
import { reducerLogger } from "./reducerLogger";

export type AppStateAction =
  | { type: "OPEN_MODAL"; payload: TSetModal }
  | { type: "CLOSE_MODAL" }
  // | { type: "ON_IS_SETTING" }
  | { type: "OPEN_DRAWER" }

  // セットで利用するが、時間差で作動させる必要があるので別に分けてある
  // | { type: "OFF_IS_SETTING" }
  | { type: "CLOSE_DRAWER" }

  // modalウィンドウを開く時
  | { type: "OPEN_ARTICLE_MODAL"; payload: TArticle }
  | {
      type: "OPEN_FOOTER_ITEM_MODAL";
      payload: { footerItem: FooterItem; modalSize: T_modal_size };
    }
  | { type: "OPEN_INSTAGRAM_MEDIA_MODAL"; payload: TInstagramMedia }

  // mainに表示するのを記事か、instagramか切り替え
  | {
      type: "SHOW_INSTAGRAM";
      payload: {
        id: T_instagram_id;
        username: T_instagram_username;
      };
    }
  | { type: "SHOW_ARTICLES" }

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
        articles: TArticles;
        selectedArticlesTags: number[];
        isSetting: boolean;
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
        selectedInstagramAccount: { id: T_instagram_id; username: T_instagram_username };
      };
    };

export function appStateReducer(state: AppState, action: AppStateAction) {
    let newState: AppState
    const func = appStateReducer
    switch (action.type) {
      case "OPEN_MODAL":
        newState = {
          ...state,
          setModal: action.payload,
          isModalOpen: true,
        };
        break;
      case "CLOSE_MODAL":
        newState = {
          ...state,
          isModalOpen: false,
        };
        break;

      case "OPEN_DRAWER":
        newState = {
          ...state,
          isDrawerOpen: true,
          isModalOpen: false,
        };
        break;

      case "CLOSE_DRAWER":
        newState = {
          ...state,
          isDrawerOpen: false,
        };
        break;

      case "OPEN_ARTICLE_MODAL":
        newState = {
          ...state,
          setModal: "content_modal",
          isModalOpen: true,
          currentModalContent: {
            ...state.currentModalContent,
            article: action.payload,
            modalSize: "large",
          },
        };
        break;
      case "OPEN_FOOTER_ITEM_MODAL":
        newState = {
          ...state,
          setModal: "footer_item_modal",
          isModalOpen: true,
          currentModalContent: {
            ...state.currentModalContent,
            footerItem: action.payload.footerItem,
            modalSize: action.payload.modalSize,
          },
        };
        break;
      case "OPEN_INSTAGRAM_MEDIA_MODAL":
        newState = {
          ...state,
          setModal: "instagram_media_modal",
          isModalOpen: true,
          currentModalContent: {
            ...state.currentModalContent,
            instagramMedia: action.payload,
            modalSize: "medium",
          },
        };
        break;
      case "SHOW_INSTAGRAM":
        newState = {
          ...state,
          isShowInstagram: true,
          selectedInstagramAccount: action.payload,
          selectedArticlesTags: [],
        };
        break;
      case "SHOW_ARTICLES":
        newState = {
          ...state,
          isShowInstagram: false,
        };
        break;

      case "OPEN_ARTICLE_EDITOR":
        newState = {
          ...state,
          setModal: "edit_article",
          isModalOpen: true,
          edittingPrams: {
            ...state.edittingPrams,
            isEditting: false,
          },
        };
        break;
      case "OPEN_FOOTER_ITEM_EDITOR":
        newState = {
          ...state,
          setModal: "edit_footer_item",
          isModalOpen: true,
          edittingPrams: {
            ...state.edittingPrams,
            isEditting: false,
            modalSize: "large",
          },
        };
        break;
      case "OPEN_ARTICLE_EDITOR_FOR_EDIT":
        newState = {
          ...state,
          setModal: "edit_article",
          isModalOpen: true,
          edittingPrams: {
            isEditting: true,
            article: { ...action.payload },
            footerItem: state.edittingPrams.footerItem,
            modalSize: "large",
          },
        };
        break;
      case "OPEN_FOOTER_ITEM_EDITOR_FOR_EDIT":
        newState = {
          ...state,
          setModal: "edit_footer_item",
          isModalOpen: true,
          edittingPrams: {
            isEditting: true,
            article: state.edittingPrams.article,
            footerItem: { ...action.payload },
            modalSize: action.payload.modal_size,
          },
        };
        break;
      case "SET_MODAL_SIZE":
        newState = {
          ...state,
          edittingPrams: {
            ...state.edittingPrams,
            modalSize: action.payload,
          },
        };
        break;

      case "SET_USER_INFO":
        newState = {
          ...state,
          userInfo: { ...state.userInfo, ...action.payload },
        };
        break;
      case "SET_THEME":
        newState = {
          ...state,
          userInfo: {
            ...state.userInfo,
            selected_theme: action.payload.selectedTheme,
          },
        };
        break;
      case "SET_ARTICLES":
        newState = {
          ...state,
          selectedArticlesTags: action.payload.selectedArticlesTags,
          isSetting: action.payload.isSetting,
          articles: action.payload.articles,
        };
        break;
      case "SET_FOOTER_ITEMS":
        newState = {
          ...state,
          footerItems: action.payload,
        };
        break;

      case "DELETE_FOOTER_ITEM":
        const deletedState = state.footerItems.filter((value, index) => {
          // 削除するアイテムは含めない
          return value.footer_item_id !== action.payload.footer_item_id;
        });
        newState = {
          ...state,
          footerItems: deletedState.map((value, index) => {
            // 削除されたアイテムの左側のorderはそのまま出力
            if (value.order < action.payload.order) {
              return value;
              // 削除されたアイテムの右側はorderの調整のためそれぞれ-1する
            } else if (value.order > action.payload.order) {
              value.order -= 1;
              return value;
            }
          }),
        };
        break;
      case "SET_TAGS":
        newState = {
          ...state,
          tags: action.payload,
        };
        break;
      case "SET_INSTAGRAM_ACCOUNTS":
        newState = {
          ...state,
          instagramAccounts: action.payload,
        };
        break;
      case "SET_INSTAGRAM_MEDIAS":
        newState = {
          ...state,
          isShowInstagram: true,
          selectedInstagramAccount: action.payload.selectedInstagramAccount,
          selectedArticlesTags: [],
          instagramMedias: action.payload.data,
        };
        break;

      default:
        console.log("エラーだよ,appStateReducer");
        newState = { ...state };
    }
    reducerLogger({ state, newState, func, action })
    return newState
}
