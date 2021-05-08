import { useStateInfoBarEditor } from './context/useStateInfoBarEditor';
import { useUpdateInfoBar } from '../../../../hooks/infoBar/useUpdateInfoBar';

export const useInfoBarEditorProps = () => {
  const {
    allArticles,
    infoBarType,
    setInfoBarType,
    editorText,
    setEditorText,
    articleInfoBar,
    setArticleInfoBar,
    charCount,
    setCharCount,
  } = useStateInfoBarEditor();

  const updateInfoBar = useUpdateInfoBar({
    infoBarType,
    editorText,
    articleInfoBar,
    charCount,
  });

  return {
    infoBarType,
    setInfoBarType,
    editorText,
    setEditorText,
    charCount,
    setCharCount,
    articleInfoBar,
    setArticleInfoBar,
    allArticles,
    updateInfoBar,
  };
};

export type InfoBarEditorPresenterProps = ReturnType<
  typeof useInfoBarEditorProps
>;
