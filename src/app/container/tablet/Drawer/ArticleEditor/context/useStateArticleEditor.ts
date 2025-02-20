import React from 'react';
import { AppStateContext } from '../../../../../stores/appState/Context';
import { TagsContext } from '../../../../../stores/tags/Context';
import { UserInfoContext } from '../../../../../stores/userInfo/Context';

export const useStateArticleEditor = () => {
  const { appState } = React.useContext(AppStateContext);
  const { tags } = React.useContext(TagsContext);
  const { userInfo } = React.useContext(UserInfoContext);
  const { is_admin } = userInfo;
  const { isEditting, article } = appState.edittingPrams;

  const [titleText, setTitleText] = React.useState(
    isEditting ? article.title : ''
  );
  const [editorText, setEditorText] = React.useState(
    isEditting ? article.article_content : ''
  );
  const [editorTextExcerpt, setEditorTextExcerpt] = React.useState(
    isEditting ? article.article_excerpt : ''
  );
  const [createdAt, setCreatedAt] = React.useState('');
  const [updatedAt, setUpdatedAt] = React.useState('');

  const [dataType, setDataType] = React.useState(
    isEditting ? article.data_type : 'default_data'
  );

  // ArticleEditor特有のもの
  const [editorImg, setEditorImg] = React.useState(
    isEditting ? article.article_img : ''
  );
  const [selectedTags, setSelectedTags] = React.useState(
    isEditting ? article.tag_ids : []
  );

  const [charCountArticleContent, setCharCountArticleContent] = React.useState(
    0
  );

  return {
    isEditting,
    is_admin,
    titleText,
    setTitleText,
    editorText,
    setEditorText,
    editorTextExcerpt,
    setEditorTextExcerpt,
    createdAt,
    setCreatedAt,
    updatedAt,
    setUpdatedAt,
    dataType,
    setDataType,
    editorImg,
    setEditorImg,
    selectedTags,
    setSelectedTags,
    charCountArticleContent,
    setCharCountArticleContent,
    tags,
  };
};
