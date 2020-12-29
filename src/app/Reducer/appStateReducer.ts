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
            article: action.payload.article,
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
        const target = action.payload.footerItems.filter((value) => {
          return action.payload.footerItemId === value.footer_item_id;
        });
        newState = {
          ...state,
          setModal:
            target[0].on_tap === "modal"
              ? "footer_item_modal"
              : "google_search",
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
            instagramMedia: action.payload,
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
      // modalSizeの変更をViewに反映させつつ、入力中の値も保持しておくためのロジック。isModalSizeChangedで判定する
      case "SET_MODAL_SIZE":
        newState = {
          ...state,
          edittingPrams: {
            ...state.edittingPrams,
            modalSize: action.payload.footerItemEdittingParams.modalSizeRadio,
            isModalSizeChanged: true,
            footerItem: {
              ...state.edittingPrams.footerItem,
              ...generateFooterItemEdittingParams(
                action.payload.footerItemEdittingParams,
                action.payload.footerItems
              ),
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
        };
        break;

      case "SET_ARTICLES":
        const isShowInstagram =
          action.payload.showArticles === true ? false : state.isShowInstagram;
        newState = {
          ...state,
          selectedArticlesTags: action.payload.selectedArticlesTags,
          isSetting: action.payload.isSetting,
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
          loading: {
            ...state.loading,
            footer: false,
          },
        };
        break;

      case "DELETE_FOOTER_ITEM":
        newState = {
          ...state,
          loading: {
            ...state.loading,
            footer: false,
          },
        };
        break;
      case "SET_TAGS":
        newState = {
          ...state,
          loading: {
            ...state.loading,
            manageTags: false,
          },
        };
        break;
      case "SET_INSTAGRAM_ACCOUNTS":
        newState = {
          ...state,
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
          loading: {
            ...state.loading,
            main: false,
          },
        };
        break;
      case "DELETE_INSTAGRAM_MEDIAS":
        newState = {
          ...state,
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
