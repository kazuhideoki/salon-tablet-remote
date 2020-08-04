import { AppState, TArticle, FooterItem, T_modal_size, TSetModal, TInstagramMedia, T_instagram_username, T_instagram_id } from '../Store/Types'
import { reducerLogger } from "./reducerLogger";
import { TrendingUpOutlined } from '@material-ui/icons';

export type AppStateAction =
  | { type: "OPEN_MODAL"; payload: TSetModal }
  | { type: "CLOSE_MODAL" }
  | { type: "ON_IS_SETTING" }
  | { type: "OPEN_DRAWER" }

  // セットで利用するが、時間差で作動させる必要があるので別に分けてある
  | { type: "OFF_IS_SETTING" }
  | { type: "CLOSE_DRAWER" }

  // modalウィンドウを開く時
  | { type: "OPEN_ARTICLE_MODAL"; payload: TArticle }
  | {
      type: "OPEN_FOOTER_ITEM_MODAL";
      payload: { footerItem: FooterItem; modalSize: T_modal_size };
    }
  | { type: "OPEN_INSTAGRAM_MEDIA_MODAL"; payload: TInstagramMedia }

  // mainに表示するのを記事か、instagramか切り替え
  | { type: "SHOW_INSTAGRAM"; payload: {
    id: T_instagram_id,
    username: T_instagram_username
  } }
  | { type: "SHOW_ARTICLES" }
  | { type: "SET_SELECTED_TAGS"; payload: number[] }

  // editor modalウィンドウを開く時. 新規と編集
  | { type: "OPEN_ARTICLE_EDITOR" }
  | { type: "OPEN_FOOTER_ITEM_EDITOR" }
  | { type: "OPEN_ARTICLE_EDITOR_FOR_EDIT"; payload: TArticle }
  | { type: "OPEN_FOOTER_ITEM_EDITOR_FOR_EDIT"; payload: FooterItem }
  | { type: "SET_MODAL_SIZE"; payload: T_modal_size };
  

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

      case "ON_IS_SETTING":
        newState = {
          ...state,
          isSetting: true,
        };
        break;
      case "OPEN_DRAWER":
        newState = {
          ...state,
          isDrawerOpen: true,
          isModalOpen: false,
        };
        break;

      case "OFF_IS_SETTING":
        newState = {
          ...state,
          isSetting: false,
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
      case "SET_SELECTED_TAGS":
        newState = {
          ...state,
          selectedArticlesTags: action.payload,
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
            modalSize: 'large',
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

      default:
        console.log("エラーだよ,appStateReducer");
        newState = { ...state };
    }
    reducerLogger({ state, newState, func, action })
    return newState
}
