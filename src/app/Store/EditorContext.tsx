import React from 'react'

type ContextProps = {
    editorText: string
    setEditorText: React.Dispatch<React.SetStateAction<string>>
}

const EditorContext = React.createContext({} as ContextProps);

const EditorContextProvider = (props) => {
      const [editorText, setEditorText] = React.useState("");

      const values = {
        editorText,
        setEditorText,
      };

      return (
          <EditorContext.Provider value={values}>
              {props.children}
          </EditorContext.Provider>
      )
}

export { EditorContext, EditorContextProvider };
