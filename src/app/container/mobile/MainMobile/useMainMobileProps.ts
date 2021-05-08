import { useMainProps } from '../../tablet/Main/useMainProps';

export const useMainMobileProps = () => {
  const {
    articles,
    dispatchAppState,
    onClickUpdate,
    deleteArticle,
    loading,
    isSetting,
    openArticleModal,
  } = useMainProps();

  return {
    articles,
    dispatchAppState,
    loading,
    isSetting,
    deleteArticle,
    onClickUpdate,
    openArticleModal,
  };
};

export type MainMobilePresenterProps = ReturnType<typeof useMainMobileProps> & {
  className?: string;
};
