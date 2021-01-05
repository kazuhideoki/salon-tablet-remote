import React, { ReactNode } from 'react';
import {
  ArticleEditorPresenter,
  ArticleEditorPresenterProps,
} from './ArticleEditor';
import { CSFStory } from '../../../../../util/interface/CSFStory';
import { ThemeProvider } from '../../../../components/ThemeProviderInStorybook';

export default {
  title: 'Drawer/ArticleEditorPresenter',
  component: ArticleEditorPresenter,
  decorators: [(story) => <ThemeProvider>{story()}</ThemeProvider>],
} as CSFStory;

const props: ArticleEditorPresenterProps = {
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
