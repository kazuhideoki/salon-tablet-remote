import { useStateInfoBar } from './context/useStateInfoBar';
import { useDrawerProps } from '../Drawer/Drawer/useDrawerPops';
import { useOpenArticleModalInfoBar } from './context/useOpenArticleModalInfoBar';

export const useInfoBarProps = () => {
  const {
    dispatchAppState,
    isSetting,
    infoBar,
    targetArticle,
    shop_name,
  } = useStateInfoBar();
  const openArticleModalInfoBar = useOpenArticleModalInfoBar();

  const { openModal } = useDrawerProps();

  return {
    dispatchAppState,
    isSetting,
    infoBar,
    targetArticle,
    openModal,
    shop_name,
    openArticleModalInfoBar,
  };
};

export type InfoBarPresenterProps = ReturnType<typeof useInfoBarProps> & {
  className?: string;
};
