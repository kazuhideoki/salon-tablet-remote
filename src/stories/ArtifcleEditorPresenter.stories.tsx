import React, { ReactNode } from 'react';
import {
  ArticleEditorPresenter,
  TUseArticleEditorProps,
} from '../app/View/tablet/Drawer/ArticleEditor/view/ArticleEditor';
import { CSFStory } from './lib/interface';
import { ThemeProvider } from './lib/ThemeProvider';

export default {
  title: 'Drawer/ArticleEditorPresenter',
  component: ArticleEditorPresenter,
  decorators: [(story) => <ThemeProvider>{story()}</ThemeProvider>],
} as CSFStory;

const props: TUseArticleEditorProps = {
  isEditting: false,
  titleText: '',
  editorText: '',
  setEditorText: () => {
    return;
  },
  setEditorTextExcerpt: () => {
    return;
  },
  createdAt: '',
  setCreatedAt: () => {
    return;
  },
  updatedAt: '',
  setUpdatedAt: () => {
    return;
  },
  setEditorImg: () => {
    return;
  },
  selectedTags: [],
  setSelectedTags: () => {
    return;
  },
  charCountArticleContent: 0,
  setCharCountArticleContent: () => {
    return;
  },
  handleSubmit: () => {
    return;
  },
  tags: [],
  is_admin: false,
  setTitleText: () => {
    return;
  },
  dataTypeAndSet: {
    dataType: 'default_data',
    setDataType: () => {
      return;
    },
  },
};

export const Normal = () => {
  const [editorText, setEditorText] = React.useState('');

  return (
    <ArticleEditorPresenter
      {...props}
      editorText={editorText}
      setEditorText={setEditorText}
    />
  );
};
export const is_Admin = () => {
  const [editorText, setEditorText] = React.useState('');

  return (
    <ArticleEditorPresenter
      {...props}
      editorText={editorText}
      setEditorText={setEditorText}
      is_admin={true}
    />
  );
};
