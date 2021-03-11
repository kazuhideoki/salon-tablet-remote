import { CreateArticleParams } from '../../../../hooks/articles/useCreateArticle';
import { DataTypeAndSet } from '../QuillEditor/components/SwitchDataTypeBox';
import { useHandleSubmit } from './context/useHandleSubmit';
import { useStateArticleEditor } from './context/useStateArticleEditor';
import { DataTypeArticle } from '../../../../../util/interface/Interface';

export const useArticleEditorProps = () => {
  const {
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
  } = useStateArticleEditor();

  const params: CreateArticleParams = {
    titleText,
    editorText,
    editorTextExcerpt,
    editorImg,
    selectedTags,
    dataType,
  };

  const handleSubmit = useHandleSubmit({ params, isEditting });

  const dataTypeAndSet: DataTypeAndSet<DataTypeArticle> = {
    dataType,
    setDataType,
  };

  return {
    is_admin,
    isEditting,
    titleText,
    editorText,
    setEditorText,
    setEditorTextExcerpt,
    createdAt,
    setCreatedAt,
    updatedAt,
    setUpdatedAt,
    setEditorImg,
    selectedTags,
    setSelectedTags,
    charCountArticleContent,
    setCharCountArticleContent,
    setTitleText,
    handleSubmit,
    tags,
    dataTypeAndSet,
  };
};
