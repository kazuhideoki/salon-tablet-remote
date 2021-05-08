import { useOnClickUpdate } from './context/useOnClickUpdate';
import { useStateMain } from './context/useStateMain';
import { useOpenArticleModal } from './context/useOpenArticleModal';
import { useOpenInstagramModal } from './context/useOpenInstagramModal';
import { useHandleLoadingMain } from './context/useHandleLoadingMain';
import { useDeleteArticle } from '../../../hooks/articles/useDeleteArticle';

export const useMainProps = () => {
  const {
    dispatchAppState,
    articles,
    tags,
    instagramMediaObject,
    loading,
    isShowInstagram,
    userInfo,
    isSetting,
  } = useStateMain();

  const openArticleModal = useOpenArticleModal();

  const deleteArticle = useDeleteArticle();

  const onClickUpdate = useOnClickUpdate();

  const openInstagramModal = useOpenInstagramModal();

  const handleLoadingMain = useHandleLoadingMain();

  return {
    isSetting,
    articles,
    instagramMediaObject,
    tags,
    deleteArticle,

    dispatchAppState,
    openArticleModal,
    openInstagramModal,

    isShowInstagram,
    show_article_type: userInfo.show_article_type,
    onClickUpdate,
    loading,
    handleLoadingMain,
  };
};

export type MainPresenterProps = ReturnType<typeof useMainProps>;
