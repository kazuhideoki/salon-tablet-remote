import React from 'react';
import { ArticleEditorPresenter, TUseArticleEditorProps } from '../app/View/Drawer/ArticleEditor/ArticleEditor';
import { Provider } from './lib/ThemeProvider';
export default {
  title: "Drawer/ArticleEditorPresenter",
  component: ArticleEditorPresenter
};

const props: TUseArticleEditorProps = {
  isEditting: false,
  titleText: "",
  editorText: "",
  setEditorText: null,
  setEditorTextExcerpt: null,
  createdAt: "",
  setCreatedAt: null,
  updatedAt: "",
  setUpdatedAt: null,
  setEditorImg: null,
  selectedTags: [],
  setSelectedTags: null,
  charCountArticleContent: 0,
  setCharCountArticlContent: null,
  handleOnChangeTitleText: null,
  handleSubmit: null,
  tags: [],
  is_admin: false,
  dataType: 'default_data',
  setDataType: null,
};

export const Normal = () => {
  const [editorText,setEditorText] = React.useState('')

  return (
    <Provider>

      <ArticleEditorPresenter {...props} editorText={editorText} setEditorText={setEditorText}/>
    </Provider>
  )
}
export const is_Admin = () => {
  const [editorText,setEditorText] = React.useState('')

  return (
    <Provider>

      <ArticleEditorPresenter {...props} editorText={editorText} setEditorText={setEditorText} is_admin={true}/>
    </Provider>
  )
}

