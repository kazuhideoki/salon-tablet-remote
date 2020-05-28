import React from 'react'
import { TArticle, FooterItem } from './Store';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
import { selectedIconReducer } from '../Reducer/selectedIconReducer';
// import { Settings } from '@material-ui/icons';

export type TSelectedIcon = [OverridableComponent<SvgIconTypeMap<{}, "svg">>, string] | null
type ContextProps = {
  // Editor共通項目
  titleText: string
  setTitleText: React.Dispatch<React.SetStateAction<string>>
  editorText: string
  setEditorText: React.Dispatch<React.SetStateAction<string>>
  editorTextExcerpt: string
  setEditorTextExcerpt: React.Dispatch<React.SetStateAction<string>>
  isEdittingContent: boolean,
  setIsEdittingContent: React.Dispatch<React.SetStateAction<boolean>>

  // ArticleEditor特有のもの
  editorImg: string
  setEditorImg: React.Dispatch<React.SetStateAction<string>>
  edittingArticleParams: TArticle
  setEdittingArticleParams: React.Dispatch<React.SetStateAction<TArticle>>

  // FooterItemEditor特有のもの
  selectedIcon: TSelectedIcon
  dispatchSelectedIcon: React.Dispatch<any>
  onTap: string
  setOnTap: React.Dispatch<React.SetStateAction<string>>
  linkUrl: string,
  setLinkUrl: React.Dispatch<React.SetStateAction<string>>,
  appLinkUrl: string
  setAppLinkUrl: React.Dispatch<React.SetStateAction<string>>,
  edittingFooterItemParams: FooterItem
  setEdittingFooterItemParams: React.Dispatch<React.SetStateAction<FooterItem>>
}

const EditorContext = React.createContext({} as ContextProps);

// Storeに一緒にするとeditorTextが更新されたときにいちいちmodalが出現してしまうので別のcontextにした
const EditorContextProvider = (props) => {
  // Editor共通項目
  const [titleText, setTitleText] = React.useState("")
  const [editorText, setEditorText] = React.useState("");
  const [editorTextExcerpt, setEditorTextExcerpt] = React.useState("");
  const [isEdittingContent, setIsEdittingContent] = React.useState(false)
  
  // ArticleEditor特有のもの
  const [editorImg, setEditorImg] = React.useState("");
  const [edittingArticleParams, setEdittingArticleParams] = React.useState(
    {} as TArticle
    );

  // FooterItemEditor特有のもの
  // reducerにすることで複雑なオブジェクトを格納できる
  const [selectedIcon, dispatchSelectedIcon] = React.useReducer(
    selectedIconReducer,
    null
  );
  const [onTap, setOnTap] = React.useState('modal')
  const [linkUrl, setLinkUrl] = React.useState('')
  const [appLinkUrl, setAppLinkUrl] = React.useState('')
  const [edittingFooterItemParams, setEdittingFooterItemParams] = React.useState({} as FooterItem);

  const values = {
    titleText,
    setTitleText,
    editorText,
    setEditorText,
    editorTextExcerpt,
    setEditorTextExcerpt,
    editorImg,
    setEditorImg,
    isEdittingContent,
    setIsEdittingContent,
    edittingArticleParams,
    setEdittingArticleParams,

    selectedIcon,
    dispatchSelectedIcon,
    onTap,
    setOnTap,
    linkUrl,
    setLinkUrl,
    appLinkUrl,
    setAppLinkUrl,
    edittingFooterItemParams,
    setEdittingFooterItemParams,
  };

  return (
      <EditorContext.Provider value={values}>
          {props.children}
      </EditorContext.Provider>
  )
}

export { EditorContext, EditorContextProvider };
export default EditorContextProvider
