import {
  TAppState, initInstagramMedias,
} from "../Store/Types";
import { reducerLogger } from "./reducerLogger";
import { AppStateAction } from "./AppStateAction";
import { generateFooterItemEdittingParams } from "../ActionCreator/footerItems/useCreateFooterItem";

export function appStateReducer(state: TAppState, action: AppStateAction) {
    let newState: TAppState;
    const func = appStateReducer
    switch (action.type) {
      case "SELECT_DEVICE":
        newState = {
          ...state,
          selectedDevice: action.payload,
        };
        break;
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
          edittingPrams: {
            ...state.edittingPrams,
            isModalSizeChanged: false,
          },
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
      case "ON_IS_LOADING_MAIN":
        newState = {
          ...state,
          loading: {
            ...state.loading,
            main: true,
          },
        };
        break;
      case "OFF_IS_LOADING_MAIN":
        newState = {
          ...state,
          loading: {
            ...state.loading,
            main: false,
          },
        };
        break;
      case "ON_IS_LOADING_FOOTER":
        newState = {
          ...state,
          loading: {
            ...state.loading,
            footer: true,
          },
        };
        break;
      case "OFF_IS_LOADING_FOOTER":
        newState = {
          ...state,
          loading: {
            ...state.loading,
            footer: false,
          },
        };
        break;
      case "ON_IS_LOADING_TAGS":
        newState = {
          ...state,
          loading: {
            ...state.loading,
            manageTags: true,
          },
        };
        break;
      case "OFF_IS_LOADING_TAGS":
        newState = {
          ...state,
          loading: {
            ...state.loading,
            manageTags: false,
          },
        };
        break;
      case "ON_IS_LOADING_INSTAGRAM_ACCOUNTS":
        newState = {
          ...state,
          loading: {
            ...state.loading,
            manageInstagramAccounts: true,
          },
        };
        break;
      case "OFF_IS_LOADING_INSTAGRAM_ACCOUNTS":
        newState = {
          ...state,
          loading: {
            ...state.loading,
            manageInstagramAccounts: false,
          },
        };
        break;

      case "OPEN_ARTICLE_MODAL":
        newState = {
          ...state,
          setModal: "content_modal",
          isModalOpen: true,
          currentModalContent: {
            ...state.currentModalContent,
            article: state.articles[action.payload],
            modalSize: "large",
          },
        };
        break;
      case "OPEN_ARTICLE_MODAL_FROM_INFO_BAR":
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
        const target = state.footerItems.filter((value) => {
          return action.payload === value.footer_item_id;
        });
        newState = {
          ...state,
          setModal: target[0].on_tap === 'modal' ? "footer_item_modal" : 'google_search',
          isModalOpen: true,
          currentModalContent: {
            ...state.currentModalContent,
            footerItem: target[0],
            modalSize: target[0].modal_size,
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
            instagramMedia: state.instagramMedias.data[action.payload],
            modalSize: "medium",
          },
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
            isModalSizeChanged: false,
            onTap: "modal",
          },
        };
        break;
      case "OPEN_ARTICLE_EDITOR_FOR_EDIT":
        newState = {
          ...state,
          setModal: "edit_article",
          isModalOpen: true,
          edittingPrams: {
            ...state.edittingPrams,
            isEditting: true,
            article: { ...action.payload },
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
            ...state.edittingPrams,
            isEditting: true,
            footerItem: { ...action.payload },
            modalSize: action.payload.modal_size,
            isModalSizeChanged: false,
            onTap: action.payload.on_tap,
          },
        };
        break;
      // modalSizeの変更をViewに反映させつつ、入力中の値も保持しておくためのロジック
      case "SET_MODAL_SIZE":
        newState = {
          ...state,
          edittingPrams: {
            ...state.edittingPrams,
            modalSize: action.payload.modalSizeRadio,
            isModalSizeChanged: true,
            footerItem: {
              ...state.edittingPrams.footerItem,
              ...generateFooterItemEdittingParams(action.payload, state.footerItems),
            },
          },
        };
        break;
      case "SET_ON_TAP":
        newState = {
          ...state,
          edittingPrams: {
            ...state.edittingPrams,
            onTap: action.payload,
          },
        };
        break;

      case "SET_USER_INFO":
        newState = {
          ...state,
          isModalOpen: false,
          userInfo: { ...state.userInfo, ...action.payload },
        };
        break;
      case "SET_THEME":
        newState = {
          ...state,
          userInfo: {
            ...state.userInfo,
            selected_theme: action.payload.themeParams.selected_theme,
            theme_color: action.payload.themeParams.theme_color,
            theme_font1: action.payload.themeParams.theme_font1,
            theme_font2: action.payload.themeParams.theme_font2,
            theme_font_heading: action.payload.themeParams.theme_font_heading,
          },
        };
        break;
      case "SET_THEME_COLOR":
        newState = {
          ...state,
          userInfo: {
            ...state.userInfo,
            theme_color: action.payload.themeColor,
          },
        };
        break;
      case "SET_THEME_FONT1":
        newState = {
          ...state,
          userInfo: {
            ...state.userInfo,
            theme_font1: action.payload.themeFont,
          },
        };
        break;
      case "SET_THEME_FONT2":
        newState = {
          ...state,
          userInfo: {
            ...state.userInfo,
            theme_font2: action.payload.themeFont,
          },
        };
        break;
      case "SET_THEME_FONT_HEADING":
        newState = {
          ...state,
          userInfo: {
            ...state.userInfo,
            theme_font_heading: action.payload.themeFont,
          },
        };
        break;
      case "SET_FOOTER_ICON_SIZE":
        newState = {
          ...state,
          userInfo: {
            ...state.userInfo,
            footer_icon_size: action.payload.footerIconSize,
          },
        };
        break;
      case "SET_SHOW_ARTICLE_TYPE":
        newState = {
          ...state,
          userInfo: {
            ...state.userInfo,
            show_article_type: action.payload.showArticleType,
          },
        };
        break;
      case "SET_IS_GENERATE_PUBLIC_PAGE":
        newState = {
          ...state,
          userInfo: {
            ...state.userInfo,
            is_generate_public_page: action.payload.is_generate_public_page,
          },
        };
        break;
      case "SET_ARTICLES":
        const isShowInstagram =
          action.payload.showArticles === true ? false : state.isShowInstagram;
        newState = {
          ...state,
          selectedArticlesTags: action.payload.selectedArticlesTags,
          isSetting: action.payload.isSetting,
          articles: action.payload.data.rawData,
          allArticles: action.payload.data.allArticles,
          paginationParams: action.payload.data.pagination,
          isShowInstagram: isShowInstagram,
          loading: {
            ...state.loading,
            main: false,
          },
        };
        break;
      case "SET_FOOTER_ITEMS":
        newState = {
          ...state,
          footerItems: action.payload,
          loading: {
            ...state.loading,
            footer: false,
          },
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
          loading: {
            ...state.loading,
            footer: false,
          },
        };
        break;
      case "SET_INFO_BAR":
        newState = {
          ...state,
          infoBarData: action.payload,
        };
        break;
      case "SET_TAGS":
        newState = {
          ...state,
          tags: action.payload,
          loading: {
            ...state.loading,
            manageTags: false,
          },
        };
        break;
      case "SET_INSTAGRAM_ACCOUNTS":
        newState = {
          ...state,
          instagramAccounts: action.payload,
          loading: {
            ...state.loading,
            manageInstagramAccounts: false,
          },
        };
        break;
      case "SET_INSTAGRAM_MEDIAS":
        newState = {
          ...state,
          isShowInstagram: true,
          selectedInstagramAccount: action.payload.selectedInstagramAccount,
          selectedArticlesTags: [],
          instagramMedias: action.payload.data,
          loading: {
            ...state.loading,
            main: false,
          },
        };
        break;
      case "DELETE_INSTAGRAM_MEDIAS":
        newState = {
          ...state,
          instagramMedias: initInstagramMedias,
          isShowInstagram: false,
        };
        break;

      default:
        console.log("エラー,appStateReducer");
        newState = { ...state };
    }
    reducerLogger({ state, newState, func, action })
    return newState
}
