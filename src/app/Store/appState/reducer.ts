import { generateFooterItemEdittingParams } from "../../ActionCreator/footerItems/useCreateFooterItem";
import { reducerLogger } from "../../Reducer/reducerLogger";
import { TAppState } from "../Types";
import { TAppStateAction } from "./actions";
import * as types from "./types";

export type AppStateContextState = TAppState;

export const appStateReducer = (
  state: AppStateContextState,
  action: TAppStateAction
) => {
  let newState: AppStateContextState;
  const func = appStateReducer;
  switch (action.type) {
    case types.OPEN_MODAL:
      newState = {
        ...state,
        setModal: action.payload,
        isModalOpen: true,
      };
      break;
    case types.CLOSE_MODAL:
      newState = {
        ...state,
        isModalOpen: false,
        edittingPrams: {
          ...state.edittingPrams,
          isModalSizeChanged: false,
        },
      };
      break;
    case types.OPEN_DRAWER:
      newState = {
        ...state,
        isDrawerOpen: true,
        isModalOpen: false,
      };
      break;
    case types.CLOSE_DRAWER:
      newState = {
        ...state,
        isDrawerOpen: false,
      };
      break;
    case types.IS_LOADING_MAIN:
      newState = {
        ...state,
        loading: {
          ...state.loading,
          main: action.payload,
        },
      };
      break;
    case types.IS_LOADING_FOOTER:
      newState = {
        ...state,
        loading: {
          ...state.loading,
          footer: action.payload,
        },
      };
      break;
    case types.IS_LOADING_TAGS:
      newState = {
        ...state,
        loading: {
          ...state.loading,
          manageTags: action.payload,
        },
      };
      break;
    case types.IS_LOADING_INSTAGRAM_ACCOUNTS:
      newState = {
        ...state,
        loading: {
          ...state.loading,
          manageInstagramAccounts: action.payload,
        },
      };
      break;
    case types.SET_ARTICLE_CONTENT:
      newState = {
        ...state,
        currentModalContent: {
          ...state.currentModalContent,
          article: action.payload,
          modalSize: "large",
        },
      };
      break;
    case types.SET_FOOTER_ITEM_CONTENT:
      newState = {
        ...state,
        currentModalContent: {
          ...state.currentModalContent,
          footerItem: action.payload,
          modalSize: action.payload.modal_size,
        },
      };
      break;
    case types.SET_INSTAGRAM_MEDIA_CONTENT:
      newState = {
        ...state,
        currentModalContent: {
          ...state.currentModalContent,
          instagramMedia: action.payload,
          modalSize: "medium",
        },
      };
      break;
    case types.CREATE_ARTICLE:
      newState = {
        ...state,
        edittingPrams: {
          ...state.edittingPrams,
          isEditting: false,
        },
      };
      break;
    case types.UPDATE_ARTICLE:
      newState = {
        ...state,
        edittingPrams: {
          ...state.edittingPrams,
          isEditting: true,
          article: { ...action.payload },
          modalSize: "large",
        },
      };
      break;
    case types.CREATE_FOOTER_ITEM:
      newState = {
        ...state,
        edittingPrams: {
          ...state.edittingPrams,
          isEditting: false,
          modalSize: "large",
          isModalSizeChanged: false,
          onTap: "modal",
        },
      };
      break;
    case types.UPDATE_FOOTER_ITEM:
      newState = {
        ...state,
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
    case types.SET_MODAL_SIZE:
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
    case types.SET_SELECTED_INSTAGRAM_ACCOUNTS:
      newState = {
        ...state,
        selectedInstagramAccount: action.payload,
        selectedArticlesTags: [],
      };
      break;
    case types.IS_SHOW_INSTAGRAM:
      newState = {
        ...state,
        isShowInstagram: action.payload,
      };
      break;
      
    case types.SET_ARTICLES_APP_STATE:
      newState = {
        ...state,
        selectedArticlesTags: action.payload.selectedArticlesTags,
        isSetting: action.payload.isSetting,
      };
      break;
  }

  reducerLogger({ state, newState, func, action });
  return newState;
};
