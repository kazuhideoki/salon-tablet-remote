import React from 'react';
import { ArticleEditorPresenter } from '../app/View/Drawer/ArticleEditor/ArticleEditor';
import { Provider } from './lib/ThemeProvider';
export default {
  title: "Drawer/ArticleEditorPresenter",
  component: ArticleEditorPresenter
};

const props = {
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
};

export const Normal = () => {
  const [editorText,setEditorText] = React.useState('')

  return (
    <Provider>

      <ArticleEditorPresenter {...props} editorText={editorText} setEditorText={setEditorText}/>
    </Provider>
  )
}

