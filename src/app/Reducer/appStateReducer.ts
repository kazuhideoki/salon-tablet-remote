import { AppState, TArticle, FooterItem, T_modal_size, TSetModal } from '../Store/Types'
import { reducerLogger } from "./reducerLogger";
import { TrendingUpOutlined } from '@material-ui/icons';

export type AppStateAction =
  | { type: "ON_IS_SETTING" }
  | { type: "OFF_IS_SETTING" }
  | { type: "OPEN_MODAL"; payload: TSetModal }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  // footerItemの場合はtitleはnullが入る
  | {
      type: "SET_MODAL_CONTENT";
      payload: {
        // showInstagram: boolean
        title: string | null;
        content: string;
        modalSize?: T_modal_size;
      };
    }
  | { type: "SET_EDITTING_PARMS_ARTICLE"; payload: TArticle }
  | { type: "SET_EDITTING_PARMS_FOOTERITEM"; payload: FooterItem }
  | { type: "OFF_EDITTING" }
  | { type: "SET_MODAL_SIZE"; payload: T_modal_size }
  | { type: "SET_TAGS_AND_IS_SHOW_INSTAGRAM"; payload: {selectingTags: number[], isShowInstagram: boolean} }
  | { type: "IS_SHOW_INSTAGRAM"; payload: boolean }
  | { type: "CLOSE_MODAL" }
  | { type: "OPEN_ARTICLE_MODAL" }
  | { type: "CLOSE_ARTICLE_MODAL" }
  | { type: "SET_IS_LOADING" }

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
      case "SET_MODAL_CONTENT":
        newState = {
          ...state,
          currentModalContent: {
            // IsShowInstagram: action.payload.showInstagram,
            title: action.payload.title || null,
            contnet: action.payload.content,
            modalSize: action.payload.modalSize || "large",
          },
        };
        break;
      case "SET_EDITTING_PARMS_ARTICLE":
        newState = {
          ...state,
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

      case "SET_TAGS_AND_IS_SHOW_INSTAGRAM":
        newState = {
          ...state,
          isShowInstagram: action.payload.isShowInstagram,
          selectedArticlesTags: action.payload.selectingTags,
        };
        break;
      case "IS_SHOW_INSTAGRAM":
        newState = {
          ...state,
          isShowInstagram: action.payload,
        };
        break;
      case "CLOSE_MODAL":
        newState = {
          ...state,
          isModalOpen: false,
        };
        break;
      case "OPEN_ARTICLE_MODAL":
        newState = {
          ...state,
          isArticleModalOpen: true,
        };
        break;
      case "CLOSE_ARTICLE_MODAL":
        newState = {
          ...state,
          isArticleModalOpen: false,
        };
        break;
      default:
        console.log("エラーだよ,appStateReducer");
        newState = { ...state };
    }
    reducerLogger({ state, newState, func, action })
    return newState
}
