import React from 'react'
import { PostDataSingle } from './Store';

type ContextProps = {
    editorText: string
    setEditorText: React.Dispatch<React.SetStateAction<string>>
    isEdittingPost: boolean,
    setIsEdittingPost: React.Dispatch<React.SetStateAction<boolean>>
    edittingPostParams:PostDataSingle
    setEdittingPostParams: React.Dispatch<React.SetStateAction<PostDataSingle>>
}

const EditorContext = React.createContext({} as ContextProps);

// Storeに一緒にするとeditorTextが更新されたときにいちいちmodalが出現してしまうので別のcontextにした
const EditorContextProvider = (props) => {
    const [editorText, setEditorText] = React.useState("");
    const [isEdittingPost, setIsEdittingPost] = React.useState(false)
    const [edittingPostParams, setEdittingPostParams] = React.useState({} as PostDataSingle);

    const values = {
      editorText,
      setEditorText,
      isEdittingPost,
      setIsEdittingPost,
      edittingPostParams,
      setEdittingPostParams,
    };

    return (
        <EditorContext.Provider value={values}>
            {props.children}
        </EditorContext.Provider>
    )
}

export { EditorContext, EditorContextProvider };
