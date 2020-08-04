import { AppState, TArticle, FooterItem, T_modal_size, TSetModal, TInstagramMedia } from '../Store/Types'
import { reducerLogger } from "./reducerLogger";
import { TrendingUpOutlined } from '@material-ui/icons';

export type AppStateAction =
  | { type: "ON_IS_SETTING" }
  | { type: "OFF_IS_SETTING" }
  | { type: "OPEN_MODAL"; payload: TSetModal }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  // footerItemの場合はtitleはnullが入る
  | { type: "OPEN_ARTICLE_MODAL"; payload: TArticle }
  | {
      type: "OPEN_FOOTER_ITEM_MODAL";
      payload: { footerItem: FooterItem; modalSize: T_modal_size };
    }
  | { type: "OPEN_INSTAGRAM_MEDIA_MODAL"; payload: TInstagramMedia }
  | { type: "IS_SHOW_INSTAGRAM"; payload: boolean }
  | { type: "OPEN_ARTICLE_MODAL_FOR_EDIT"; payload: TArticle }
  | { type: "SET_EDITTING_PARMS_FOOTERITEM"; payload: FooterItem }
  | { type: "OFF_EDITTING" }
  | { type: "SET_MODAL_SIZE"; payload: T_modal_size }
  | { type: "SET_TAGS_AND_SHOW_ARTICLES"; payload: number[] }
  | { type: "CLOSE_MODAL" };

export function appStateReducer(state: AppState, action: AppStateAction) {
    let newState: AppState
    const func = appStateReducer
    switch (action.type) {
      case "ON_IS_SETTING":
        newState = {
          ...state,
          isSetting: true,
        };
        break;
      case "OFF_IS_SETTING":
        newState = {
          ...state,
          isSetting: false,
        };
        break;
      case "OPEN_MODAL":
        newState = {
          ...state,
          setModal: action.payload,
          isModalOpen: true,
        };
        break;
      case "OPEN_DRAWER":
        newState = {
          ...state,
          isDrawerOpen: true,
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
          // isShowInstagram: false,
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
          // isShowInstagram: false,
          currentModalContent: {
            ...state.currentModalContent,
            footerItem: action.payload.footerItem,
            modalSize: action.payload.modalSize,
          },
        };
        break;
      // ↑↓isShowInstagramはどこで切り替えるのか？再考
      case "OPEN_INSTAGRAM_MEDIA_MODAL":
        newState = {
          ...state,
          setModal: "instagram_media_modal",
          isModalOpen: true,
          // isShowInstagram: true,
          currentModalContent: {
            ...state.currentModalContent,
            instagramMedia: action.payload,
            modalSize: "medium",
          },
        };
        break;
      case "IS_SHOW_INSTAGRAM":
        newState = {
          ...state,
          isShowInstagram: action.payload,
        };
        break;
      case "OPEN_ARTICLE_MODAL_FOR_EDIT":
        newState = {
          ...state,
          setModal: "edit_article",
          isModalOpen: true,
          edittingPrams: {
            isEditting: true,
            article: { ...action.payload },
            footerItem: state.edittingPrams.footerItem,
            modalSize: state.edittingPrams.modalSize,
          },
        };
        break;
      case "SET_EDITTING_PARMS_FOOTERITEM":
        newState = {
          ...state,
          edittingPrams: {
            isEditting: true,
            article: state.edittingPrams.article,
            footerItem: { ...action.payload },
            modalSize: action.payload.modal_size,
          },
        };
        break;
      case "OFF_EDITTING":
        newState = {
          ...state,
          edittingPrams: {
            isEditting: false,
            article: state.edittingPrams.article,
            footerItem: state.edittingPrams.footerItem,
            modalSize: "large",
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

      case "SET_TAGS_AND_SHOW_ARTICLES":
        newState = {
          ...state,
          isShowInstagram: false,
          selectedArticlesTags: action.payload,
        };
        break;
      case "CLOSE_MODAL":
        newState = {
          ...state,
          isModalOpen: false,
        };
        break;

      default:
        console.log("エラーだよ,appStateReducer");
        newState = { ...state };
    }
    reducerLogger({ state, newState, func, action })
    return newState
}
