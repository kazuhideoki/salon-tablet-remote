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
      

      case "SET_ARTICLES":
        const isShowInstagram =
          action.payload.showArticles === true ? false : state.isShowInstagram;
        newState = {
          ...state,
          selectedArticlesTags: action.payload.selectedArticlesTags,
          isSetting: action.payload.isSetting,
          isShowInstagram: isShowInstagram,
        };
        break;

      case "SET_INSTAGRAM_MEDIAS":
        newState = {
          ...state,
          isShowInstagram: true,
          selectedInstagramAccount: action.payload.selectedInstagramAccount,
          selectedArticlesTags: [],
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
