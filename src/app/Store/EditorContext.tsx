import React from 'react'
import { TArticle, FooterItem } from './Store';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core';
// import { Settings } from '@material-ui/icons';

type ContextProps = {
  titleText: string
  setTitleText: React.Dispatch<React.SetStateAction<string>>
  editorText: string
  setEditorText: React.Dispatch<React.SetStateAction<string>>
  isEdittingPost: boolean,
  setIsEdittingPost: React.Dispatch<React.SetStateAction<boolean>>
  edittingPostParams: TArticle
  setEdittingPostParams: React.Dispatch<React.SetStateAction<TArticle>>

  selectedIcon: OverridableComponent<SvgIconTypeMap<{}, "svg">> | null
  dispatchSelectedIcon: React.Dispatch<any>
  iconName: string
  setIconName: React.Dispatch<React.SetStateAction<string>>
  footerItemEditorText: string
  setFooterItemEditorText: React.Dispatch<React.SetStateAction<string>>
  isEdittingFooterItem: boolean
  setIsEdittingFooterItem: React.Dispatch<React.SetStateAction<boolean>>
  edittingFooterItemParams: FooterItem
  setEdittingFooterItemParams: React.Dispatch<React.SetStateAction<FooterItem>>
}

const EditorContext = React.createContext({} as ContextProps);

// Storeに一緒にするとeditorTextが更新されたときにいちいちmodalが出現してしまうので別のcontextにした
const EditorContextProvider = (props) => {
  const [titleText, setTitleText] = React.useState("")
  const [editorText, setEditorText] = React.useState("");
  const [isEdittingPost, setIsEdittingPost] = React.useState(false)
  const [edittingPostParams, setEdittingPostParams] = React.useState(
    {} as TArticle
  );


  const selectedIconReducer = (state, action) => {
    switch (action.type) {
      case "SET_ICON":
        return action.payload
        break;
    
      default:
        return state
        break;
    }
  }
  // reducerにすることで複雑なオブジェクトを格納できる
  const [selectedIcon, dispatchSelectedIcon] = React.useReducer(
    selectedIconReducer,
    null
  );
  const [iconName, setIconName] = React.useState("")
  const [footerItemEditorText, setFooterItemEditorText] = React.useState("");
  const [isEdittingFooterItem, setIsEdittingFooterItem] = React.useState(false)
  const [edittingFooterItemParams, setEdittingFooterItemParams] = React.useState({} as FooterItem);

  const values = {
    titleText,
    setTitleText,
    editorText,
    setEditorText,
    isEdittingPost,
    setIsEdittingPost,
    edittingPostParams,
    setEdittingPostParams,

    selectedIcon,
    dispatchSelectedIcon,
    iconName,
    setIconName,
    footerItemEditorText,
    setFooterItemEditorText,
    isEdittingFooterItem,
    setIsEdittingFooterItem,
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
